import { redirect, useActionData, useLoaderData } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/ProductServices";
import { Product } from "../../types";
import { Link, Form } from "react-router-dom";
import ProductForm from "../../components/ProductForm";

export async function loader({ params }: LoaderFunctionArgs) {
  if (params.id !== undefined) {
    const product = await getProductById(+params.id);
    if (!product) {
      throw new Response("Producto no encontrado", { status: 404 });
    }
    return product;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  let error = "";
  if (Object.values(data).includes("")) {
    error = "Todos los campos son obligatorios";
  }
  if (error.length) {
    return { error };
  }
  if (params.id !== undefined) {
    await updateProduct(+params.id, data);
    return redirect("/");
  }
}
const options = [
  { value: "true", label: "Disponible" },
  { value: "false", label: "No Disponible" },
];

export default function EditProduct() {
  const error = useActionData() as string;
  const product = useLoaderData() as Product;
  return (
    <div>
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-4xl font-bold text-sky-700">Editar Producto</h2>
          <Link className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors font-semibold" to="/">
            Volver a Listado de Productos
          </Link>
        </div>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form method="POST">
          <ProductForm product={product} />
          <div className="mt-4">
            <label
              htmlFor="disponible"
              className="block font-medium text-gray-700"
            >
              Disponibilidad
            </label>
            <select
              name="disponible"
              id="disponible"
              className="mt-1 block w-full py-1 px-1 rounded-sm border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition-colors mt-6"
          >
            Actualizar Producto
          </button>
        </Form>
      </div>
    </div>
  );
}
