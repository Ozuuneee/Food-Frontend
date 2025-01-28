// import { useCart } from "@/utils/cartContext";
// import { Button } from "@/components/ui/button";
// import { Minus, Plus, Trash } from "lucide-react";

// export const Cart = () => {
//   const { cart, addToCart, removeFromCart } = useCart();

//   return (
//     <div className="p-6 border rounded-lg shadow-md bg-white">
//       <h2 className="text-lg font-semibold mb-4">🛒 My Cart</h2>
//       {cart.length === 0 ? (
//         <p className="text-gray-500">Your cart is empty.</p>
//       ) : (
//         <>
//           {cart.map((item) => (
//             <div
//               key={item.id}
//               className="flex items-center justify-between mb-4"
//             >
//               <div className="flex items-center gap-4">
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-14 h-14 rounded-md"
//                 />
//                 <div>
//                   <h3 className="text-sm font-semibold">{item.name}</h3>
//                   <p className="text-gray-500">${item.price.toFixed(2)}</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Button
//                   size="icon"
//                   variant="outline"
//                   onClick={() => removeFromCart(item.id)}
//                 >
//                   <Minus />
//                 </Button>
//                 <span>{item.quantity}</span>
//                 <Button
//                   size="icon"
//                   variant="outline"
//                   onClick={() => addToCart(item)}
//                 >
//                   <Plus />
//                 </Button>
//                 <Button
//                   size="icon"
//                   variant="destructive"
//                   onClick={() => removeFromCart(item.id)}
//                 >
//                   <Trash />
//                 </Button>
//               </div>
//             </div>
//           ))}
//           <div className="mt-4 text-lg font-semibold">
//             Total: $
//             {cart
//               .reduce((total, item) => total + item.price * item.quantity, 0)
//               .toFixed(2)}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };
