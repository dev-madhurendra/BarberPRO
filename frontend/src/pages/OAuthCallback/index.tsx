// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { updateRole, getCurrentUser } from "../../api/auth";
// import OAuthLoader from "../../components/atoms/Loader";
// import { decodeJWT } from "../../utils/functionConfig";

// const OAuthCallback: React.FC = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("token");
//     const role = params.get("role");

//     if (token && role) {
//       localStorage.setItem("token", token);

//       const lowercaseRole = role.toLowerCase();
//       const newRole = localStorage.getItem("newRole") || lowercaseRole;
//       localStorage.setItem("role", newRole);

//       const decoded = decodeJWT(token);
//       console.log("Decoded JWT:", decoded);

//       const handleRedirect = (isBarberProfileUpdated: boolean = false) => {
//         const finalRole = newRole.toLowerCase();
//         if (finalRole === "customer") {
//           navigate("/customer/dashboard");
//         } else if (finalRole === "barber") {
//           if (isBarberProfileUpdated) {
//             navigate("/barber/dashboard");
//           } else {
//             navigate("/barber/setup-profile");
//           }
//         } else {
//           navigate("/");
//         }
//       };

//       if (newRole.toLowerCase() === "barber") {
//         updateRole(newRole.toLowerCase())
//           .then(() => {
//             return getCurrentUser(); 
//           })
//           .then((res) => {
//             handleRedirect(res.data.isBarberProfileUpdated);
//           })
//           .catch((err) => {
//             console.error("OAuth error:", err);
//             navigate("/");
//           })
//           .finally(() => {
//             setLoading(false);
//           });
//       } else {
//         handleRedirect();
//         setLoading(false);
//       }
//     } else {
//       navigate("/");
//       setLoading(false);
//     }
//   }, [navigate]);

//   return <OAuthLoader loading={loading} />;
// };

// export default OAuthCallback;