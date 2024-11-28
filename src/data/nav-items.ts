export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  active: boolean;
  collapsible: boolean;
  sublist?: NavItem[];
}

const navItems: NavItem[] = [
  {
    title: 'Recaudación',
    path: '/',
    icon: 'hugeicons:taxes',
    active: true,
    collapsible: false,
    /*  sublist: [
      {
        title: 'Dashboard',
        path: '/',
        active: false,
        collapsible: false,
      },
      {
        title: 'Sales',
        path: '/',
        active: false,
        collapsible: false,
      },
    ], */
  },
  {
    title: 'Presupuesto',
    path: '#!',
    icon: 'eos-icons:project',
    active: false,
    collapsible: false,
    /*  sublist: [
      {
        title: 'Profile',
        path: '#!',
        active: false,
        collapsible: false,
        sublist: [
          {
            title: 'Overview',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'All Projects',
            path: '#!',
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: 'Users',
        path: '#!',
        active: false,
        collapsible: false,
        sublist: [
          {
            title: 'All Users',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Add user',
            path: '#!',
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: 'Account',
        path: '#!',
        active: false,
        collapsible: false,
        sublist: [
          {
            title: 'Setting',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Billing',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Invoice',
            path: '#!',
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: 'Projects',
        path: '#!',
        active: false,
        collapsible: false,
        sublist: [
          {
            title: 'Timeline',
            path: '#!',
            active: false,
            collapsible: false,
          },
        ],
      },
    ], */
  },
  {
    title: 'RRHH',
    path: '#!',
    icon: 'vaadin:users',
    active: false,
    collapsible: false,
    /*  sublist: [
      {
        title: 'Kanban',
        path: '#!',
        active: false,
        collapsible: false,
      },
      {
        title: 'Wizard',
        path: '#!',
        active: false,
        collapsible: false,
      },
      {
        title: 'Data Tables',
        path: '#!',
        active: false,
        collapsible: false,
      },
      {
        title: 'Schedule',
        path: '#!',
        active: false,
        collapsible: false,
      },
    ], */
  },
  {
    title: 'Tesorería',
    path: '#!',
    icon: 'bi:cash-coin',
    active: false,
    collapsible: false,
    sublist: [
      {
        title: 'Products',
        path: '#!',
        active: false,
        collapsible: false,
        sublist: [
          {
            title: 'All Products',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Edit Product',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'New Product',
            path: '#!',
            active: false,
            collapsible: false,
          },
        ],
      },
      {
        title: 'Orders',
        path: 'orders',
        active: false,
        collapsible: false,
        sublist: [
          {
            title: 'Order List',
            path: '#!',
            active: false,
            collapsible: false,
          },
          {
            title: 'Order Detail',
            path: '#!',
            active: false,
            collapsible: false,
          },
        ],
      },
    ],
  },
  {
    title: 'Viviendas',
    path: 'authentication',
    icon: 'ion:home-sharp',
    active: true,
    collapsible: false,
    sublist: [
      {
        title: 'Sign In',
        path: 'login',
        active: true,
        collapsible: false,
      },
      {
        title: 'Sign Up',
        path: 'sign-up',
        active: true,
        collapsible: false,
      },
      {
        title: 'Forgot password',
        path: 'forgot-password',
        active: true,
        collapsible: false,
      },
      {
        title: 'Reset password',
        path: 'reset-password',
        active: true,
        collapsible: false,
      },
    ],
  },
  {
    title: 'Compras',
    path: '#!',
    icon: 'bxs:purchase-tag',
    active: false,
    collapsible: false,
  },
];

export default navItems;
