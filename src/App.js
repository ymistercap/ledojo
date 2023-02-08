import './App.css';
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const App = () => {
  const [tasks, setTasks] = useState([]);

  let tab = [
    {
      title: 'Introduction Cybersécurité',
      category: 'Cybersécurité',
      status: 'Victoire'
    },
    {
      title: 'Protéger son WiFi personnel',
      category: 'À la maison',
      status: 'À commencer'
    },
    {
      title: 'Je reconnais des données personnelles',
      category: 'RGPD',
      status: 'À commencer'
    },
    {
      title: 'Reconnaître un mail de phishing',
      category: 'Cybersécurité',
      status: 'Défaite'
    },
    {
      title: 'Bien utiliser son smartphone',
      category: 'À la maison',
      status: 'À commencer'
    },
    {
      title: 'Choisir un mot de passe invincible',
      category: 'Cybersécurité',
      status: 'À commencer'
    },
    {
      title: 'Limiter mon empreinte numérique',
      category: 'À la maison',
      status: 'À commencer'
    },
    {
      title: 'Pourquoi le RGPD est important',
      category: 'RGPD',
      status: 'À commencer'
    },
    {
      title: 'Introduction RGPD',
      category: 'RGPD',
      status: 'Défaite'
    }
  ]


  const handleClick = (index) => {
    const newTasks = [...tasks];
    const newStatus = Math.random() < 0.5 ? 'Victoire' : 'Défaite';
    newTasks[index].status = newStatus;
    setTasks(newTasks);
  };

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (a.status === 'À commencer') {
        return -1;
      } else if (b.status === 'À commencer') {
        return 1;
      } else if (a.status === 'Défaite' && b.status === 'Victoire') {
        return -1;
      } else if (a.status === 'Victoire' && b.status === 'Défaite') {
        return 1;
      } else {
        return 0;
      }
    });
  };

  const props = useSpring({
    opacity: 1,
    transform: 'translate3d(0,0,0)',
    from: { opacity: 0, transform: 'translate3d(0,300px,0)' },
  });

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setTasks(sortTasks(tab));
  }, []);

  return (
    <div>
      {!showContent && (
        <animated.div style={props}>
          <h1 className='bienvenue'>Bienvenue au dojo !</h1>
          <button className="center-button" onClick={() => setShowContent(true)}>
            Cliquez sur ce bouton pour accéder aux entraînements
          </button>
        </animated.div>
      )}

      {showContent && (
        <div>
          <h2 className="title">Entraînements</h2>
          <div className="training-container">
            {tasks
              .sort((a, b) => {
                if (a.status === 'À commencer') return -1;
                if (b.status === 'À commencer') return 1;
                if (a.status === 'Défaite') return -1;
                if (b.status === 'Défaite') return 1;
                return 0;
              })
              .map((task, index) => (
                <div key={task.title} className="training-card">
                  <div className="training-card-content">
                    <h3>{task.title}</h3>
                    <p>Catégorie: {task.category}</p>
                    <p>Status: {task.status}</p>
                    {(task.status === 'À commencer' || task.status === 'Défaite') && (
                      <button className="button" onClick={() => handleClick(index)}>Go !</button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
