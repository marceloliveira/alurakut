import React from 'react';
import jwt from 'jsonwebtoken';
import nookies from 'nookies';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';

function ProfileSidebar(propriedades) {
  return (
    <Box>
        <img src={`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px' }}/>
    </Box>
  )
}

function ProfileRelations(propriedades) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{propriedades.name} ({propriedades.dados.length})</h2>
      <ul>
          {propriedades.dados.slice(0,6).map(itemAtual => {
            return (
              <li key={itemAtual.id}>
                <a href={itemAtual.link} target="_blank">
                  <img src={itemAtual.imageUrl} />
                  <span>{itemAtual.title}</span>
                </a>
              </li>
            )
          })}
        </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home(props) {
  const usuario = props.githubUser;
  const pessoasFavoritas = [
    { id: 'omariosouto', title: 'omariosouto', imageUrl: 'https://github.com/omariosouto.png', link: 'https://github.com/omariosouto' },
    { id: 'peas', title: 'peas', imageUrl: 'https://github.com/peas.png', link: 'https://github.com/peas' },
    { id: 'juunegreiros', title: 'juunegreiros', imageUrl: 'https://github.com/juunegreiros.png', link: 'https://github.com/juunegreiros' },
    { id: 'rla4', title: 'rla4', imageUrl: 'https://github.com/rla4.png', link: 'https://github.com/rla4' },
    { id: 'rafaballerini', title: 'rafaballerini', imageUrl: 'https://github.com/rafaballerini.png', link: 'https://github.com/rafaballerini' },
    { id: 'marceloliveira', title: 'marceloliveira', imageUrl: 'https://github.com/marceloliveira.png', link: 'https://github.com/marceloliveira' },
    { id: 'marcobrunodev', title: 'marcobrunodev', imageUrl: 'https://github.com/marcobrunodev.png', link: 'https://github.com/marcobrunodev' },
  ];
  const [comunidades, setComunidades] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);
  React.useEffect(() =>{
    fetch(`https://api.github.com/users/${usuario}/followers`)
    .then(res => res.json())
    .then(data => setSeguidores(data.map(f => { return { id: f.id, title: f.login, imageUrl: f.avatar_url, link: f.html_url } })));
    fetch(`https://graphql.datocms.com/`, {
      method: 'POST',
      headers: {
        'Authorization': '62ca25e308e8462292a06680537eb0',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ query: 'query { allCommunities { id title imageUrl link }}'})
    })
    .then(res => res.json())
    .then(resp => setComunidades(resp.data.allCommunities));
  },[]);
  return (
    <>
      <AlurakutMenu githubUser={usuario}></AlurakutMenu>
      <MainGrid>
        <div className="photoArea" style={{ gridArea: 'photoArea'}}>
          <ProfileSidebar githubUser={usuario}/>
        </div>
        <div className="profileArea" style={{ gridArea: 'profileArea'}}>
          <Box as="header">
            <h1 className="title">
              Bem vindo(a), @{usuario}! 
            </h1>
            <OrkutNostalgicIconSet />
          </Box>
        </div>
        <div className="menuArea" style={{ gridArea: 'menuArea'}}>
          <Box>
            <AlurakutProfileSidebarMenuDefault />
          </Box>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea'}}>
          
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form 
              onSubmit={e => {
                e.preventDefault();
                const formData = new FormData(e.target);
                fetch('/api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ creatorSlug: usuario, title: formData.get('title'), imageUrl: formData.get('image') ? formData.get('image') : `https://picsum.photos/seed/${formData.get('title')}/300/300`, link: formData.get('link')})
                })
                .then(async res => {
                  setComunidades([await res.json(), ...comunidades])
                });                
              }}>
              <input placeholder="Nome da sua comunidade" name="title" aria-label="Nome da sua comunidade" />
              <input placeholder="URL da comunidade" name="link" aria-label="URL da comunidade" />
              <input placeholder="URL da imagem da comunidade (Opcional)" name="image" aria-label="URL da imagem da comunidade (Opcional)" />
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelations name="Seguidores" dados={seguidores} />
          <ProfileRelations name="Comunidades" dados={comunidades} />
          <ProfileRelations name="Pessoas Favoritas" dados={pessoasFavoritas} />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN;

  const props = jwt.decode(token);

  const isAuthenticated = await fetch(`https://github.com/${props.githubUser}`,
    {
      method: 'HEAD'
    }
  )
  .then(res => res.ok);

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props
  }

}