import {
  faCalendar,
  faPager,
  faPaste,
  faCoffee,
  faCamera,
  faHeart,
  faEnvelope,
  faStar,
  faSmile,
  faSun,
  faMoon,
  faPlane,
  faBicycle,
  faCar,
  faBus,
  faTrain,
  faShip,
  faTruck,
  faMotorcycle,
  faCircleHalfStroke,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

export const APP_ICONS = {
  paste: faPaste,
  calendar: faCalendar,
  pager: faPager,
  coffee: faCoffee,
  camera: faCamera,
  heart: faHeart,
  envelope: faEnvelope,
  star: faStar,
  smile: faSmile,
  sun: faSun,
  moon: faMoon,
  plane: faPlane,
  bicycle: faBicycle,
  car: faCar,
  bus: faBus,
  train: faTrain,
  ship: faShip,
  truck: faTruck,
  motorcycle: faMotorcycle,
  circleHalfStroke: faCircleHalfStroke,
  circle: faCircle,
};
export type TIconKey = keyof typeof APP_ICONS;
