export const pages = [
  {
    name: 'Quickstart',
    icon: {
      name: 'material-symbols:rocket-rounded',
      class: 'rotate-45'
    }
  },
  {
    name: 'Installation',
    icon: 'lucide:download',
    children: [
      {
        name: 'Using docker',
        icon: 'uil:docker'
      }
    ]
  },
  {
    name: 'Configuration',
    icon: 'lucide:settings',
    children: [
      {
        name: 'General config',
        icon: 'lucide:server'
      }
    ]
  }
];
