import React, { useRef, useEffect, useState } from "react";
import * as echarts from "echarts";
import "./TotalPrice.scss";
import { $totalPrice } from "../../api/typeApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function TotalPrice() {
  const refDiv = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false); // 图片加载状态
  const [chartLoaded, setChartLoaded] = useState(false); // 图表加载状态

  useEffect(() => {
    if (refDiv.current) {
      let myChart = echarts.init(refDiv.current);

      myChart.setOption({
        title: { text: "房间类型销售额统计" },
        tooltip: {},
        xAxis: { data: ["单人房", "双人房", "豪华房", "总统套房"] },
        yAxis: {},
        series: [{ name: "销售额", type: "bar", data: [500, 1200, 800, 2500] }],
      });

      setChartLoaded(true); // 标记图表加载完成

      return () => {
        myChart.dispose();
      };
    }
  }, []);

  return (
    <div className="total-price-container" style={{ textAlign: "center", padding: "20px" }}>
      {/* 📌 懒加载图片  */}
      <LazyLoadImage
        src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0
" // 你的新图片 URL
        alt="图"
        effect="blur" // 懒加载模糊效果
        height="250px"
        width="100%"
        style={{ marginBottom: "20px", borderRadius: "10px" }}
        onLoad={() => {
          console.log("✅ 图片加载成功！");
          setImageLoaded(true);
        }}
        onError={() => console.log("❌ 图片加载失败！")}
      />
      
      {/* ✅ 图片加载状态提示 */}
      {imageLoaded ? <p style={{ color: "green" }}>✅ 图片已成功加载！</p> : <p style={{ color: "red" }}>⏳ 图片加载中...</p>}

      📊 ECharts 图表
      <div className="charts" ref={refDiv} style={{ width: "600px", height: "400px", margin: "0 auto" }} />

      {/* ✅ 图表加载状态提示 */}
      {chartLoaded && <p style={{ color: "blue", marginTop: "10px" }}>📊 图表已成功渲染！</p>}
    </div>
  );
}
