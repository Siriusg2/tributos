import avgRevenue from 'assets/sale-info/avg-revenue.png';
import customers from 'assets/sale-info/customers.png';
import sales from 'assets/sale-info/sales.png';
import assets from 'assets/sale-info/bookings.png';
import cobrabilidad from 'assets/sale-info/today-users.png';
import employees from 'assets/sale-info/followers.png';

interface HomeData {
  id: number;
  image: string;
  title: string;
  amount: number;
  increment: number;
  date: string;
}

export const collectionsData: HomeData[] = [
  {
    id: 1,
    image: assets,
    title: 'Bienes activos',
    amount: 230525122,
    increment: 55,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },

  {
    id: 2,
    image: cobrabilidad,
    title: 'Cobrabilidad',
    amount: 18641000,
    increment: 21,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
  {
    id: 3,
    image: avgRevenue,
    title: 'Recaudación general',
    amount: 16854665,
    increment: -2,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
];
export const budgetsData: HomeData[] = [
  {
    id: 1,
    image: cobrabilidad,
    title: '',
    amount: 230220,
    increment: 55,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
  {
    id: 2,
    image: customers,
    title: 'Clientes',
    amount: 3200,
    increment: -12,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
  {
    id: 3,
    image: avgRevenue,
    title: 'Recaudación general',
    amount: 2300,
    increment: 210,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
  {
    id: 4,
    image: avgRevenue,
    title: 'Recaudación general',
    amount: 2300,
    increment: 210,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
];

export const rrhhData: HomeData[] = [
  {
    id: 1,
    image: avgRevenue,
    title: 'Gasto en sueldos',
    amount: 25302021,
    increment: 15,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
  {
    id: 2,
    image: employees,
    title: 'Cantidad de empleados',
    amount: 220,
    increment: 0,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
];
export const treasuryData: HomeData[] = [
  {
    id: 1,
    image: avgRevenue,
    title: 'Total efectivo en caja y bancos',
    amount: 23022032,
    increment: 15.2,
    date: `${new Date().toLocaleString('es-ES', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    })} `,
  },
];
export const housingData: HomeData[] = [
  {
    id: 1,
    image: sales,
    title: 'Ventas',
    amount: 230220,
    increment: 55,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
];
export const purchasesData: HomeData[] = [
  {
    id: 1,
    image: sales,
    title: 'Ventas',
    amount: 230220,
    increment: 55,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
  {
    id: 2,
    image: customers,
    title: 'Clientes',
    amount: 3200,
    increment: -12,
    date: `${new Date().toLocaleString('es-ES', { month: 'short' })} ${new Date().getFullYear()}`,
  },
];
