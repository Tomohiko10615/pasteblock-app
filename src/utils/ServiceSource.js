export const getServiceSource = (servicio) => {
  switch (servicio) {
    case "Albañilería":
      source = require("../../assets/serv1.png");
      break;
    case "Pintura":
      source = require("../../assets/serv2.png");
      break;
    case "Electricidad":
      source = require("../../assets/serv3.png");
      break;
    case "Gasfitería":
      source = require("../../assets/serv4.png");
      break;
    default:
      break;
  }
  return source;
};
