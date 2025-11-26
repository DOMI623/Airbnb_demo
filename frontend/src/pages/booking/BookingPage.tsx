import { useParams } from "react-router-dom";

export default function BookingPage() {
  const { id } = useParams();

  return <h1>Booking ID: {id}</h1>;
}
