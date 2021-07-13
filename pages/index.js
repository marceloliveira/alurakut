import React from 'react';
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
  console.log(propriedades);
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{propriedades.name} ({propriedades.dados.length})</h2>
      <ul>
          {propriedades.dados.slice(0,6).map(itemAtual => {
            return (
              <li key={itemAtual.id}>
                <a href={itemAtual.link} target="_blank">
                  <img src={itemAtual.image} />
                  <span>{itemAtual.name}</span>
                </a>
              </li>
            )
          })}
        </ul>
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home() {
  const usuario = 'marceloliveira';
  const pessoasFavoritas = [
    { id: 'omariosouto', name: 'omariosouto', image: 'https://github.com/omariosouto.png', link: 'https://github.com/omariosouto' },
    { id: 'peas', name: 'peas', image: 'https://github.com/peas.png', link: 'https://github.com/peas' },
    { id: 'juunegreiros', name: 'juunegreiros', image: 'https://github.com/juunegreiros.png', link: 'https://github.com/juunegreiros' },
    { id: 'rla4', name: 'rla4', image: 'https://github.com/rla4.png', link: 'https://github.com/rla4' },
    { id: 'rafaballerini', name: 'rafaballerini', image: 'https://github.com/rafaballerini.png', link: 'https://github.com/rafaballerini' },
    { id: 'marceloliveira', name: 'marceloliveira', image: 'https://github.com/marceloliveira.png', link: 'https://github.com/marceloliveira' },
    { id: 'marcobrunodev', name: 'marcobrunodev', image: 'https://github.com/marcobrunodev.png', link: 'https://github.com/marcobrunodev' },
  ];
  const [comunidades, setComunidades] = React.useState([{ id: new Date().toISOString(), name: 'Alurakut', image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg', link: 'https://www.alura.com.br/imersao-react/'}])
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
                setComunidades([...comunidades, { id: new Date().toISOString(), name: formData.get('title'), image: formData.get('image') ? formData.get('image') : `https://picsum.photos/seed/${formData.get('title')}/300/300`, link: formData.get('link')}])
              }}>
              <input placeholder="Nome da sua comunidade" name="title" aria-label="Nome da sua comunidade" />
              <input placeholder="URL da comunidade" name="link" aria-label="URL da comunidade" />
              <input placeholder="URL da imagem da comunidade (Opcional)" name="image" aria-label="URL da imagem da comunidade (Opcional)" />
              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea'}}>
          <ProfileRelations name="Comunidades" dados={comunidades} />
          <ProfileRelations name="Pessoas Favoritas" dados={pessoasFavoritas} />
        </div>
      </MainGrid>
    </>
  )
}
