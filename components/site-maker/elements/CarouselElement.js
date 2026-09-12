"use client";

import { useEffect, useState } from "react";

export default function CarouselElement({ element, editable = false }) {
  const images = Array.isArray(element.images)
    ? element.images.filter(Boolean)
    : [];
  const [active, setActive] = useState(0);
  const speed = Math.max(1, Number(element.transitionSpeed) || 4);
  useEffect(() => {
    if (editable || !element.autoplay || images.length < 2) return undefined;
    const timer = setInterval(
      () => setActive((index) => (index + 1) % images.length),
      speed * 1000,
    );
    return () => clearInterval(timer);
  }, [editable, element.autoplay, images.length, speed]);
  const current = Math.min(active, Math.max(images.length - 1, 0));
  if (!images.length)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "grid",
          placeItems: "center",
          border: "2px dashed rgba(255,255,255,.7)",
          borderRadius: element.style?.borderRadius || 14,
          color: "#fff",
          background:
            "linear-gradient(135deg,rgba(167,139,250,.38),rgba(56,189,248,.25))",
          textAlign: "center",
          padding: 16,
        }}
      >
        <strong>Add carousel images</strong>
        <span style={{ fontSize: 11 }}>
          Use the Content panel to add image URLs.
        </span>
      </div>
    );
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        borderRadius: element.style?.borderRadius || 14,
        background: "#111827",
      }}
    >
      {images.map((src, index) => (
        // External slide URLs are intentionally rendered without optimization.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: index === current ? 1 : 0,
            transition: `opacity ${Math.min(speed, 2)}s ease`,
          }}
        />
      ))}
      {element.showArrows !== false && images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActive((current + images.length - 1) % images.length);
            }}
            aria-label="Previous slide"
            style={control("left")}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActive((current + 1) % images.length);
            }}
            aria-label="Next slide"
            style={control("right")}
          >
            ›
          </button>
        </>
      )}
      {element.showDots !== false && images.length > 1 && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: 6,
          }}
        >
          {images.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={(event) => {
                event.stopPropagation();
                setActive(index);
              }}
              aria-label={`Show slide ${index + 1}`}
              style={{
                width: 7,
                height: 7,
                padding: 0,
                border: 0,
                borderRadius: 999,
                cursor: "pointer",
                background: index === current ? "#fff" : "rgba(255,255,255,.55)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function control(side) {
  return {
    position: "absolute",
    [side]: 10,
    top: "50%",
    translate: "0 -50%",
    width: 30,
    height: 30,
    border: 0,
    borderRadius: 999,
    background: "rgba(10,10,20,.55)",
    color: "#fff",
    fontSize: 25,
    lineHeight: 1,
    cursor: "pointer",
  };
}
