export default {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 7000,
      },
    },
    color: {
      value: '#ffffff',
    },
    shape: {
      type: 'circle',
      stroke: {
        width: 0,
        color: '#000000',
      },
      polygon: {
        nb_sides: 5,
      },
      image: {
        src: 'img/github.svg',
        width: 10,
        height: 10,
      },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: {
        enable: false,
        speed: 1,
        opacity_min: 0.1,
        sync: false,
      },
    },
    size: {
      value: 15,
      random: true,
      anim: {
        enable: false,
        speed: 10,
        size_min: 10,
        sync: true,
      },
    },
    line_linked: {
      enable: true,
      distance: 200,
      color: '#ffffff',
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 1.5,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      attract: {
        enable: false,
        rotateX: 600,
        rotateY: 1200,
      },
    },
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
      resize: true,
    },
    modes: {
      grab: {
        distance: 400,
        line_linked: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 100,
        size: 10,
        duration: 10,
        opacity: 8,
        speed: 10,
      },
      repulse: {
        distance: 50,
      },
      push: {
        particles_nb: 10,
      },
      remove: {
        particles_nb: 1,
      },
    },
  },
  retina_detect: false,
  config_demo: {
    hide_card: false,
    background_color: '#1f1f1f',
    background_image: '',
    background_position: '50% 50%',
    background_repeat: 'no-repeat',
    background_size: 'cover',
  },
}
