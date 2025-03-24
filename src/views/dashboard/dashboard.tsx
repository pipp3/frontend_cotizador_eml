
import ProductTable from "../products/ProductTable";
export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">

      {/* Tabla de productos */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <ProductTable />
      </div>
    </div>
  );
}

