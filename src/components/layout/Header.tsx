// import Link from 'next/link';
// import Button from '../common/Button';

// export default function Header() {
//   return (
//     <header className="bg-white shadow-sm">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         <Link href="/" className="flex items-center space-x-2">
//           <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
//           <h1 className="text-xl font-bold text-gray-800">Data Alchemist</h1>
//         </Link>
        
//         <nav className="flex space-x-4">
//           <Button variant="secondary" asLink href="/docs">
//             Documentation
//           </Button>
//           <Button variant="primary">
//             Export Data
//           </Button>
//         </nav>
//       </div>
//     </header>
//   );
// }


import Link from 'next/link';
import Button from '../common/Button';

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          <h1 className="text-xl font-bold text-gray-800">Data Alchemist</h1>
        </Link>
        
        <nav className="flex space-x-4">
          <Link href="/docs">
            <Button variant="secondary">
              Documentation
            </Button>
          </Link>
          <Button variant="primary">
            Export Data
          </Button>
        </nav>
      </div>
    </header>
  );
}
