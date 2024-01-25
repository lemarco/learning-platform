import dynamic from "next/dynamic";
import { ComponentProps, useEffect, useState } from "react";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

function Chart(props: ComponentProps<typeof ApexChart>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (mounted) return <ApexChart {...props} width="100%" />;
}

export default Chart;
