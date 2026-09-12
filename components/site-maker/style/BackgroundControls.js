"use client";

import { useState } from "react";

const FALLBACK_COLORS = ["#172554", "#7c3aed", "#ec4899"];
const OBJECTS = [["circle", "●"], ["ring", "◉"], ["square", "■"], ["triangle", "▲"], ["hexagon", "⬡"], ["cube", "◫"], ["pyramid", "◭"], ["star", "★"], ["blob", "✦"], ["starfield", "✧"], ["orbs", "◌"], ["dotgrid", "⠿"], ["mesh", "≈"]];
const makeObject = (type) => ({ id: crypto.randomUUID(), type, color: "#c4b5fd", color2: "#38bdf8", gradient: false, size: ["starfield", "dotgrid"].includes(type) ? 4 : 120, opacity: 0.45, quantity: ["starfield", "orbs", "dotgrid"].includes(type) ? 18 : 1, scatter: "random", animation: "none", speed: "medium", direction: "clockwise", axis: "y" });

export default function BackgroundControls({ section, onChange }) {
  const colors = (
    section.backgroundColors?.length
      ? section.backgroundColors
      : [section.background || FALLBACK_COLORS[0], FALLBACK_COLORS[1]]
  ).slice(0, 3);
  const type = section.backgroundType || "solid";
  const updateColors = (next) =>
    onChange({ backgroundColors: next, background: next[0] || "#172554" });
  const setImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      onChange({
        backgroundImage: String(reader.result),
        backgroundType: "image",
      });
    reader.readAsDataURL(file);
  };
  const preview =
    type === "image"
      ? `linear-gradient(${section.backgroundOverlay || "rgba(0,0,0,0)"},${section.backgroundOverlay || "rgba(0,0,0,0)"}),url("${section.backgroundImage || ""}")`
      : type === "dots"
        ? "radial-gradient(rgba(255,255,255,.35) 1px,transparent 1px)"
        : type === "grid"
          ? "linear-gradient(rgba(255,255,255,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.25) 1px,transparent 1px)"
          : type === "stripes"
            ? "repeating-linear-gradient(135deg,rgba(255,255,255,.25) 0 1px,transparent 1px 12px)"
            : type === "solid"
              ? colors[0]
              : `${type}-gradient(${type === "linear" ? `${section.backgroundAngle ?? 135}deg, ` : "circle at center, "}${colors.join(", ")})`;
  return (
    <div
      className="sm-background-controls"
      style={{ display: "grid", gap: 10 }}
    >
      <span className="sm-field-label">Background</span>
      <div
        className="sm-choice sm-background-type"
        style={{ gridTemplateColumns: "repeat(3,1fr)" }}
      >
      {[
          ["solid", "Solid"],
          ["linear", "Gradient"],
          ["radial", "Radial"],
          ["image", "Image"],
          ["dots", "Dots"],
          ["grid", "Grid"],
          ["stripes", "Stripes"],
        ].map(([value, label]) => (
          <button
            type="button"
            key={value}
            className={type === value ? "active" : ""}
            onClick={() => onChange({ backgroundType: value })}
          >
            {label}
          </button>
        ))}
      </div>
      <div
        className="sm-gradient-preview"
        style={{
          height: 72,
          borderRadius: 10,
          backgroundColor: colors[0],
          backgroundImage: preview,
          backgroundSize:
            type === "image"
              ? section.backgroundFit || "cover"
              : type === "dots"
                ? "18px 18px"
                : type === "grid"
                  ? "24px 24px"
                  : undefined,
          backgroundPosition: section.backgroundPosition || "center",
        }}
      />
      {type === "image" && (
        <>
          <label className="sm-field-label">
            Image URL
            <input
              value={section.backgroundImage || ""}
              placeholder="https://…"
              onChange={(event) =>
                onChange({ backgroundImage: event.target.value })
              }
            />
          </label>
          <label className="sm-field-label">
            Upload image
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setImage(event.target.files?.[0])}
            />
          </label>
          <label className="sm-field-label">
            Fit
            <select
              value={section.backgroundFit || "cover"}
              onChange={(event) =>
                onChange({ backgroundFit: event.target.value })
              }
            >
              <option value="cover">Cover</option>
              <option value="contain">Contain</option>
            </select>
          </label>
          <label className="sm-field-label">
            Position
            <select
              value={section.backgroundPosition || "center"}
              onChange={(event) =>
                onChange({ backgroundPosition: event.target.value })
              }
            >
              <option>center</option>
              <option>top</option>
              <option>bottom</option>
              <option>left</option>
              <option>right</option>
            </select>
          </label>
          <label className="sm-field-label">
            Overlay colour
            <input
              type="color"
              value={section.backgroundOverlayColor || "#000000"}
              onChange={(event) =>
                onChange({
                  backgroundOverlayColor: event.target.value,
                  backgroundOverlay: `${event.target.value}${Math.round(
                    (section.backgroundOverlayOpacity ?? 0.35) * 255,
                  )
                    .toString(16)
                    .padStart(2, "0")}`,
                })
              }
            />
          </label>
          <label className="sm-field-label">
            Overlay opacity:{" "}
            {Math.round((section.backgroundOverlayOpacity ?? 0.35) * 100)}%
            <input
              type="range"
              min="0"
              max="1"
              step=".05"
              value={section.backgroundOverlayOpacity ?? 0.35}
              onChange={(event) => {
                const opacity = Number(event.target.value);
                const color = section.backgroundOverlayColor || "#000000";
                onChange({
                  backgroundOverlayOpacity: opacity,
                  backgroundOverlay: `${color}${Math.round(opacity * 255)
                    .toString(16)
                    .padStart(2, "0")}`,
                });
              }}
            />
          </label>
        </>
      )}
      {["solid", "linear", "radial"].includes(type) && (
        <>
          {colors.map((color, index) => (
            <div
              className="sm-color-stop"
              style={{
                display: "grid",
                gridTemplateColumns: "38px 1fr auto",
                gap: 7,
                alignItems: "center",
              }}
              key={`${color}-${index}`}
            >
              <input
                aria-label={`Background color ${index + 1}`}
                style={{ height: 32, padding: 1 }}
                type="color"
                value={color}
                onChange={(event) =>
                  updateColors(
                    colors.map((item, itemIndex) =>
                      itemIndex === index ? event.target.value : item,
                    ),
                  )
                }
              />
              <input
                value={color}
                onChange={(event) =>
                  /^#[0-9a-fA-F]{6}$/.test(event.target.value) &&
                  updateColors(
                    colors.map((item, itemIndex) =>
                      itemIndex === index ? event.target.value : item,
                    ),
                  )
                }
              />
              {index > 1 && (
                <button
                  type="button"
                  aria-label="Remove color"
                  onClick={() =>
                    updateColors(
                      colors.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {type !== "solid" && (
            <>
              {colors.length < 3 && (
                <button
                  type="button"
                  onClick={() =>
                    updateColors([...colors, FALLBACK_COLORS[colors.length]])
                  }
                >
                  + Add color
                </button>
              )}
              <label className="sm-field-label">
                Blend direction: {section.backgroundAngle ?? 135}°
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={section.backgroundAngle ?? 135}
                  onChange={(event) =>
                    onChange({ backgroundAngle: Number(event.target.value) })
                  }
                />
              </label>
            </>
          )}
        </>
      )}
      <BackgroundObjects objects={section.backgroundObjects || []} onChange={(backgroundObjects) => onChange({ backgroundObjects })} />
    </div>
  );
}

function BackgroundObjects({ objects, onChange }) {
  const [open, setOpen] = useState(false);
  const update = (id, patch) => onChange(objects.map((item) => item.id === id ? { ...item, ...patch } : item));
  const field = (label, child) => <label className="sm-field-label">{label}{child}</label>;
  return <div style={{ display: "grid", gap: 9, paddingTop: 9, borderTop: "1px solid rgba(255,255,255,.1)" }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><span className="sm-field-label">Background Objects</span><button type="button" onClick={() => setOpen(!open)}>+ Add</button></div>
    {open && <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 5 }}>{OBJECTS.map(([type, icon]) => <button type="button" key={type} title={type} onClick={() => { onChange([...objects, makeObject(type)]); setOpen(false); }} style={{ minHeight: 46, borderRadius: 7, border: "1px solid rgba(255,255,255,.12)", background: "#181824", color: "#ddd6fe", cursor: "pointer" }}>{icon}<small style={{ display: "block", fontSize: 8 }}>{type}</small></button>)}</div>}
    {!objects.length && <small style={{ color: "#9494a6" }}>Layer decorative shapes and effects behind your content.</small>}
    {objects.map((item) => <div key={item.id} style={{ display: "grid", gap: 7, padding: 9, borderRadius: 8, background: "rgba(255,255,255,.045)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#ede9fe", textTransform: "capitalize", fontSize: 12, fontWeight: 700 }}><span>{OBJECTS.find(([type]) => type === item.type)?.[1]} {item.type}</span><button type="button" onClick={() => onChange(objects.filter((object) => object.id !== item.id))}>Remove</button></div>
      {field("Colour", <input type="color" value={item.color} onChange={(e) => update(item.id, { color: e.target.value })} />)}
      <label style={{ display: "flex", gap: 6, textTransform: "none" }}><input type="checkbox" checked={item.gradient} onChange={(e) => update(item.id, { gradient: e.target.checked })} /> Gradient fill</label>
      {item.gradient && field("Second colour", <input type="color" value={item.color2} onChange={(e) => update(item.id, { color2: e.target.value })} />)}
      {field(`Size: ${item.size}px`, <input type="range" min="2" max="420" value={item.size} onChange={(e) => update(item.id, { size: Number(e.target.value) })} />)}
      {field(`Opacity: ${Math.round(item.opacity * 100)}%`, <input type="range" min=".05" max="1" step=".05" value={item.opacity} onChange={(e) => update(item.id, { opacity: Number(e.target.value) })} />)}
      {field(`Quantity / density: ${item.quantity}`, <input type="range" min="1" max="40" value={item.quantity} onChange={(e) => update(item.id, { quantity: Number(e.target.value) })} />)}
      {field("Position pattern", <select value={item.scatter} onChange={(e) => update(item.id, { scatter: e.target.value })}><option value="random">Random scatter</option><option value="corners">Corner cluster</option><option value="edges">Edge-aligned</option></select>)}
      {field("Animation", <select value={item.animation} onChange={(e) => update(item.id, { animation: e.target.value })}><option value="none">Still</option><option value="rotate">Rotate</option><option value="float">Float / bob</option><option value="orbit">Orbit</option><option value="pulse">Pulse</option><option value="drift">Drift</option><option value="parallax">Parallax on scroll</option></select>)}
      {item.animation !== "none" && <>{field("Speed", <select value={item.speed} onChange={(e) => update(item.id, { speed: e.target.value })}><option value="slow">Slow</option><option value="medium">Medium</option><option value="fast">Fast</option></select>)}{item.animation === "rotate" && <>{field("Direction", <select value={item.direction} onChange={(e) => update(item.id, { direction: e.target.value })}><option value="clockwise">Clockwise</option><option value="counter">Counter-clockwise</option></select>)}{["cube", "pyramid"].includes(item.type) && field("3D axis", <select value={item.axis} onChange={(e) => update(item.id, { axis: e.target.value })}><option value="x">X axis</option><option value="y">Y axis</option><option value="z">Z axis</option></select>)}</>}</>}
    </div>)}
  </div>;
}
