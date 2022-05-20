export default [
  {
    component: 'CNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Products',
  },
  {
    component: 'CNavItem',
    name: 'Products',
    to: '/products',
    icon: 'cil-barcode',
  },
  {
    component: 'CNavItem',
    name: 'Categories',
    to: '/categories',
    icon: 'cil-list',
  },
  {
    component: 'CNavTitle',
    name: 'Purchase',
  },
  {
    component: 'CNavItem',
    name: 'Purchases',
    to: '/purchases',
    icon: 'cil-basket',
  },
  {
    component: 'CNavItem',
    name: 'Suppliers',
    to: '/suppliers',
    icon: 'cil-truck',
  },
 
  
  {
    component: 'CNavTitle',
    name: 'Customers',
  },
 
  {
    component: 'CNavItem',
    name: 'Customers',
    to: '/customers',
    icon: 'cil-people',
  },
  {
    component: 'CNavItem',
    name: 'Users',
    to: '/users',
    icon: 'cil-user',
  },
  {
    component: 'CNavItem',
    name: 'Settings',
    to: '/settings',
    icon: 'cil-settings',
  },
]
