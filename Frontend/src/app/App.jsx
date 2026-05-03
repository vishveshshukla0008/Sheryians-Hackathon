import AppRoutes from "./AppRoutes";
import { Lenis } from "lenis/react";
import "lenis/dist/lenis.css";

function App() {
  return (
    <Lenis
      root
      options={{
        // Slightly higher lerp keeps Lenis closer to the wheel when heavy sections
        // (e.g. animated SVG beams) dip frame rate — avoids “stuttery” catch-up.
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
      }}
    >
      <AppRoutes />
    </Lenis>
  );
}

export default App;
