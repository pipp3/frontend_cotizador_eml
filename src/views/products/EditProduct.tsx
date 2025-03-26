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
    return redirect("/productos-admin");
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
    <div className="flex items-center justify-center bg-gray-50 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-indigo-800">
            Editar Producto
          </h2>
        </div>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <Form method="POST" className="mt-8 space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-indigo-700">
              Información del Producto
            </h3>
            
            <ProductForm product={product} />

            <div>
              <label
                htmlFor="disponible"
                className="block text-sm font-medium text-gray-700"
              >
                Disponibilidad
              </label>
              <select
                name="disponible"
                id="disponible"
                defaultValue={product.disponible.toString()}
                className="mt-1 appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Link
              to="/productos-admin"
              className="group relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="group relative w-32 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Actualizar
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
