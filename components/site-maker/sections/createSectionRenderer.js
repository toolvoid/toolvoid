"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Rnd } from "react-rnd";
import { Copy, ImagePlus, Layers3, Trash2, Type } from "lucide-react";
import IconElement from "../elements/IconElement";
import ShapeElement from "../elements/ShapeElement";
import DividerElement from "../elements/DividerElement";
import VideoElement from "../elements/VideoElement";
import FormElement from "../elements/FormElement";
import SocialLinksElement from "../elements/SocialLinksElement";
import CodeElement from "../elements/CodeElement";
import CarouselElement from "../elements/CarouselElement";
import ImageUploader from "../media/ImageUploader";
import VideoUploader from "../media/VideoUploader";

const FRAME_WIDTH = 1200;
const elementStyle = { position: "absolute", boxSizing: "border-box" };
function elementAnimation(element, index) {
  const animation = element.animation || "none";
  const stagger = index * 90;
  if (animation === "flip")
    return "smElementFlip .62s cubic-bezier(.2,.8,.2,1) both";
  if (animation === "rotate-in")
    return "smElementRotate .58s cubic-bezier(.2,.8,.2,1) both";
  if (animation === "typewriter")
    return "smElementType 1.15s steps(24, end) both";
  if (animation === "stagger-children")
    return `smElementStagger .5s cubic-bezier(.2,.8,.2,1) ${stagger}ms both`;
  const scrollAnimations = {
    "scroll-fade": "smElementFade .5s ease both",
    "scroll-up": "smElementUp .55s cubic-bezier(.2,.8,.2,1) both",
    "scroll-left": "smElementLeft .55s cubic-bezier(.2,.8,.2,1) both",
    "scroll-right": "smElementRight .55s cubic-bezier(.2,.8,.2,1) both",
    "scroll-zoom": "smElementZoom .55s cubic-bezier(.2,.8,.2,1) both",
    "scroll-bounce": "smElementBounce .7s cubic-bezier(.2,.8,.2,1) both",
  };
  return scrollAnimations[animation];
}
const objectSpot = (scatter, index) => {
  const random = [[12,18],[74,14],[48,32],[82,62],[18,72],[60,82],[36,56],[90,36]];
  const corners = [[5,8],[82,8],[7,74],[80,72]];
  const edges = [[8,18],[38,5],[76,12],[91,42],[68,87],[28,90],[4,58]];
  return (scatter === "corners" ? corners : scatter === "edges" ? edges : random)[index % (scatter === "corners" ? corners.length : scatter === "edges" ? edges.length : random.length)];
};
function BackgroundObjectsLayer({ objects = [] }) {
  return <div className="sm-bg-objects" aria-hidden="true">{objects.flatMap((object) => Array.from({ length: Math.max(1, Number(object.quantity) || 1) }, (_, index) => {
    const [left, top] = objectSpot(object.scatter, index);
    const size = Math.max(2, Number(object.size) || 100);
    const animation = object.animation || "none";
    const speed = { slow: 18, medium: 10, fast: 5 }[object.speed] || 10;
    const animationName = animation === "rotate" ? `smBgRotate${["cube", "pyramid"].includes(object.type) ? String(object.axis || "y").toUpperCase() : "Z"}` : animation === "float" ? "smBgFloat" : animation === "orbit" ? "smBgOrbit" : animation === "pulse" ? "smBgPulse" : animation === "drift" ? "smBgDrift" : animation === "parallax" ? "smBgParallax" : undefined;
    const fill = object.gradient ? `linear-gradient(135deg,${object.color},${object.color2 || "#38bdf8"})` : object.color;
    const dot = ["starfield", "dotgrid"].includes(object.type);
    return <i key={`${object.id}-${index}`} className={`sm-bg-object sm-bg-${object.type}`} style={{ left: `${left + (dot ? (index % 5) * 3 : 0)}%`, top: `${top + (dot ? Math.floor(index / 5) * 4 : 0)}%`, width: `${size}px`, height: `${size}px`, opacity: object.opacity ?? .45, color: object.color, background: fill, animation: animationName ? `${animationName} ${speed}s ${animation === "pulse" ? "ease-in-out" : "linear"} infinite${object.direction === "counter" ? " reverse" : ""}` : undefined, animationTimeline: animation === "parallax" ? "scroll()" : undefined }} />;
  }))}</div>;
}
function PlusGlyph({ type }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 800 }}>
      {type === "video"
        ? "▶"
        : type === "form"
          ? "▤"
          : type === "social"
            ? "●"
            : type === "divider"
              ? "—"
              : type === "shape"
                ? "◇"
                : "✦"}
    </span>
  );
}
const TOOL_LABELS = {
  heading: "Heading",
  text: "Custom text",
  image: "Image",
  button: "Button",
  icon: "Icon",
  shape: "Shape",
  divider: "Divider",
  video: "Video",
  form: "Form",
  social: "Social",
  code: "Custom HTML",
  carousel: "Carousel",
};

function ElementContent({
  element,
  editable,
  selected,
  onChange,
  onMediaChange,
  onSettingsChange = () => {},
  onNavigatePage,
}) {
  const style = element.style || {};
  const visual = {
    fontFamily: style.fontFamily || undefined,
    fontSize: style.fontSize ? `${style.fontSize}px` : undefined,
    fontWeight: style.fontWeight || undefined,
    fontStyle: style.fontStyle || undefined,
    textAlign: style.textAlign || undefined,
    color: style.color || undefined,
    backgroundColor:
      style.backgroundColor && style.backgroundColor !== "transparent"
        ? style.backgroundColor
        : undefined,
    border: style.borderWidth
      ? `${style.borderWidth}px ${style.borderStyle || "solid"} ${style.borderColor || "#fff"}`
      : undefined,
    borderRadius: style.borderRadius ? `${style.borderRadius}px` : undefined,
    boxShadow: style.boxShadow || undefined,
    opacity: style.opacity ?? 1,
    padding: style.padding || undefined,
    whiteSpace: style.whiteSpace || undefined,
  };
  if (element.type === "icon")
    return (
      <IconElement
        element={element}
        editable={editable && selected}
        onChange={onChange}
      />
    );
  if (element.type === "shape")
    return (
      <ShapeElement
        element={element}
        editable={editable && selected}
        onChange={onChange}
      />
    );
  if (element.type === "divider") return <DividerElement element={element} />;
  if (element.type === "video")
    return (
      <>
        <VideoElement
          element={element}
          editable={editable}
          showSettings={editable && selected}
          onSettingsChange={onSettingsChange}
        />
        {editable && selected && <VideoUploader onChange={onMediaChange} />}
      </>
    );
  if (element.type === "form") return <FormElement element={element} />;
  if (element.type === "social")
    return <SocialLinksElement element={element} editable={editable} />;
  if (element.type === "carousel")
    return <CarouselElement element={element} editable={editable} />;
  if (element.type === "code")
    return (
      <CodeElement
        element={element}
        editable={editable && selected}
        editorMode={editable}
        onChange={onChange}
      />
    );
  if (element.type === "image")
    return (
      <>
        {element.content ? (
          <Image
            unoptimized
            src={element.content}
            alt=""
            width={320}
            height={220}
            className="sm-element-image"
            style={visual}
          />
        ) : (
          <div
            className="sm-image-placeholder"
            style={{
              ...visual,
              background:
                "linear-gradient(135deg,rgba(167,139,250,.34),rgba(56,189,248,.2))",
              border: "2px dashed rgba(255,255,255,.7)",
              borderRadius: 14,
            }}
          >
            <ImagePlus size={30} />
            <strong style={{ fontSize: 14 }}>Add an image</strong>
            <span style={{ fontSize: 11 }}>Select this block to upload</span>
          </div>
        )}
        {editable && selected && (
          <ImageUploader value={element.content} onChange={onMediaChange} />
        )}
      </>
    );
  if (element.type === "button")
    return (
      <a
        className="sm-element-button"
        style={visual}
        href={element.linkType === "page" ? "#" : element.href || "#"}
        target={element.openInNewTab ? "_blank" : undefined}
        rel={element.openInNewTab ? "noreferrer" : undefined}
        onClick={(event) => {
          if (editable || element.linkType === "page") event.preventDefault();
          if (!editable && element.linkType === "page" && element.pageId)
            onNavigatePage?.(element.pageId);
        }}
        contentEditable={editable && selected}
        suppressContentEditableWarning
        onBlur={(event) =>
          onChange(event.currentTarget.textContent || "Button")
        }
      >
        {element.content}
      </a>
    );
  const Tag = element.type === "heading" ? "h2" : "p";
  return (
    <Tag
      className={`sm-element-${element.type}`}
      style={visual}
      contentEditable={editable && selected}
      suppressContentEditableWarning
      onBlur={(event) => onChange(event.currentTarget.textContent || "")}
    >
      {element.content}
    </Tag>
  );
}

function FloatingToolbar({
  element,
  onDelete,
  onDuplicate,
  onFront,
  onUpdate,
}) {
  return (
    <div
      className="sm-element-toolbar"
      onMouseDown={(event) => event.stopPropagation()}
    >
      <button title="Duplicate element" onClick={onDuplicate}>
        <Copy size={13} />
      </button>
      <button title="Bring to front" onClick={onFront}>
        <Layers3 size={13} />
      </button>
      <button title="Delete element" onClick={onDelete}>
        <Trash2 size={13} />
      </button>
      {element.type === "image" && (
        <label title="Change image URL">
          <ImagePlus size={13} />
          <input
            placeholder="Image URL"
            defaultValue={element.content}
            onBlur={(event) =>
              event.target.value &&
              onUpdate({ content: event.target.value, media: null })
            }
          />
        </label>
      )}
    </div>
  );
}

export function createSectionRenderer(label, icon, type = label.toLowerCase()) {
  return function SectionRenderer({
    section,
    editable = false,
    mobileMode = false,
    breakpoint = "desktop",
    selectedElementId,
    selectedElementIds = [],
    onSelectElement,
    onUpdateElement,
    onDeleteElement,
    onDuplicateElement,
    onBringToFront,
    onAddElement,
    onNavigatePage,
    scale = 1,
  }) {
    // Normalize older saved projects so a partially migrated section never crashes the editor.
    const elements = [
      ...(Array.isArray(section.elements) ? section.elements : []),
    ].sort((a, b) => a.y - b.y || a.zIndex - b.zIndex);
    const height = section.height || 440;
    const sectionRef = useRef(null);
    const [revealed, setRevealed] = useState(false);
    const [guides, setGuides] = useState({});
    const isScrollAnimation = String(section.animation || "").startsWith(
      "scroll-",
    );
    useEffect(() => {
      if (!isScrollAnimation) {
        setRevealed(true);
        return undefined;
      }
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        },
        { threshold: 0.14 },
      );
      if (sectionRef.current) observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }, [isScrollAnimation]);
    const colors = section.backgroundColors?.length
      ? section.backgroundColors
      : [section.background || "#172554"];
    const isGradient =
      section.backgroundType === "linear" ||
      section.backgroundType === "radial";
    const backgroundImage =
      section.backgroundType === "linear"
        ? `linear-gradient(${section.backgroundAngle ?? 135}deg, ${colors.join(", ")})`
        : section.backgroundType === "radial"
          ? `radial-gradient(circle at center, ${colors.join(", ")})`
          : "none";
    const motionDuration = Math.max(2, Number(section.motionDuration) || 8);
    const rawIntensity = Number(section.motionIntensity);
    const motionIntensity = Number.isFinite(rawIntensity)
      ? Math.max(0, Math.min(100, rawIntensity))
      : 55;
    const backgroundAnimation =
      section.animation === "aurora"
        ? `smSiteAurora ${motionDuration}s ease-in-out infinite alternate`
        : section.animation === "fade-in"
          ? `smSiteFade ${motionDuration}s ease-in-out infinite alternate`
          : section.animation === "slide-up"
            ? `smSiteSlide ${motionDuration}s ease-in-out infinite alternate`
            : section.animation === "shimmer"
              ? `smSiteShimmer ${motionDuration}s ease-in-out infinite alternate`
              : section.animation === "depth"
                ? `smSiteDepth ${motionDuration}s ease-in-out infinite alternate`
                : section.animation === "glow"
                  ? `smSiteGlow ${motionDuration}s ease-in-out infinite alternate`
                  : undefined;
    const revealAnimation =
      isScrollAnimation && revealed
        ? {
            "scroll-zoom": "smRevealZoom .7s cubic-bezier(.2,.8,.2,1) both",
            "scroll-up": "smRevealUp .65s cubic-bezier(.2,.8,.2,1) both",
            "scroll-left": "smRevealLeft .65s cubic-bezier(.2,.8,.2,1) both",
            "scroll-right": "smRevealRight .65s cubic-bezier(.2,.8,.2,1) both",
            "scroll-bounce": "smRevealBounce .8s cubic-bezier(.2,.8,.2,1) both",
          }[section.animation] || "smRevealFade .55s ease both"
        : undefined;
    const hiddenTranslate =
      section.animation === "scroll-up"
        ? "0 24px"
        : section.animation === "scroll-left"
          ? "-32px 0"
          : section.animation === "scroll-right"
            ? "32px 0"
            : "0 0";
    const pattern =
      section.backgroundType === "dots"
        ? "radial-gradient(rgba(255,255,255,.24) 1px, transparent 1px)"
        : section.backgroundType === "grid"
          ? "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px),linear-gradient(90deg,rgba(255,255,255,.18) 1px,transparent 1px)"
          : section.backgroundType === "stripes"
            ? "repeating-linear-gradient(135deg,rgba(255,255,255,.16) 0 1px,transparent 1px 12px)"
            : "";
    const overlay = section.backgroundOverlay || "rgba(0,0,0,0)";
    const sectionStyle = {
      width: FRAME_WIDTH,
      height,
      backgroundColor: colors[0],
      backgroundImage:
        section.backgroundType === "image"
          ? `linear-gradient(${overlay},${overlay}),url("${section.backgroundImage || ""}")`
          : pattern || backgroundImage,
      backgroundSize:
        section.backgroundType === "image"
          ? section.backgroundFit || "cover"
          : pattern
            ? section.backgroundType === "dots"
              ? "18px 18px"
              : section.backgroundType === "grid"
                ? "24px 24px"
                : "auto"
            : ["slide-up", "shimmer"].includes(section.animation) && isGradient
              ? "160% 160%"
              : undefined,
      backgroundPosition: section.backgroundPosition || "center",
      backgroundRepeat:
        section.backgroundType === "image"
          ? "no-repeat"
          : pattern
            ? "repeat"
            : "no-repeat",
      position: "relative",
      overflow: "hidden",
      color: "#fff",
      fontFamily: "system-ui, sans-serif",
      "--sm-hue": `${Math.round(motionIntensity * 0.55)}deg`,
      "--sm-bright": `${(1 + motionIntensity / 250).toFixed(2)}`,
      "--sm-saturation": `${(1 + motionIntensity / 180).toFixed(2)}`,
      "--sm-shift": `${Math.round(motionIntensity * 1.4)}px`,
      animation:
        [backgroundAnimation, revealAnimation].filter(Boolean).join(", ") ||
        undefined,
      opacity: isScrollAnimation && !revealed ? 0 : 1,
      translate: isScrollAnimation && !revealed ? hiddenTranslate : "0 0",
    };
    const animationStyles = (
      <style>
        {
          ".sm-bg-objects{position:absolute;inset:0;z-index:0;overflow:hidden;pointer-events:none}.sm-bg-object{position:absolute;display:block;transform-style:preserve-3d;will-change:transform}.sm-bg-circle,.sm-bg-orbs{border-radius:999px}.sm-bg-ring{border-radius:999px;background:transparent!important;border:calc(min(10px,10%)) solid currentColor}.sm-bg-triangle{clip-path:polygon(50% 0,100% 100%,0 100%)}.sm-bg-hexagon{clip-path:polygon(25% 6%,75% 6%,100% 50%,75% 94%,25% 94%,0 50%)}.sm-bg-star{clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 93%,50% 72%,21% 93%,32% 57%,2% 35%,39% 35%)}.sm-bg-blob{border-radius:62% 38% 55% 45%/45% 58% 42% 55%}.sm-bg-cube{clip-path:polygon(50% 0,100% 25%,100% 75%,50% 100%,0 75%,0 25%);box-shadow:inset -20px -20px 25px rgba(0,0,0,.28),inset 20px 20px 25px rgba(255,255,255,.22)}.sm-bg-pyramid{clip-path:polygon(50% 0,100% 100%,0 100%);box-shadow:inset 0 -24px 25px rgba(0,0,0,.32)}.sm-bg-orbs{filter:blur(1px);box-shadow:0 0 32px currentColor}.sm-bg-starfield{border-radius:99px;box-shadow:0 0 8px currentColor}.sm-bg-dotgrid{border-radius:99px}.sm-bg-mesh{width:330px!important;height:260px!important;border-radius:55%;filter:blur(32px)}@keyframes smBgRotateZ{to{transform:rotate(360deg)}}@keyframes smBgRotateX{to{transform:perspective(800px) rotateX(360deg)}}@keyframes smBgRotateY{to{transform:perspective(800px) rotateY(360deg)}}@keyframes smBgFloat{0%,100%{transform:translateY(-12px)}50%{transform:translateY(14px)}}@keyframes smBgOrbit{to{transform:rotate(360deg) translateX(42px) rotate(-360deg)}}@keyframes smBgPulse{0%,100%{transform:scale(.82)}50%{transform:scale(1.12)}}@keyframes smBgDrift{0%{transform:translate(-20px,-12px)}50%{transform:translate(30px,24px)}100%{transform:translate(-20px,-12px)}}@keyframes smBgParallax{from{transform:translateY(-38px)}to{transform:translateY(38px)}}@keyframes smSiteFade{0%,100%{filter:saturate(.9) brightness(.94)}50%{filter:saturate(var(--sm-saturation)) brightness(var(--sm-bright))}}@keyframes smSiteSlide{0%{background-position:0 0}100%{background-position:var(--sm-shift) calc(var(--sm-shift) * .4)}}@keyframes smSiteAurora{0%{filter:hue-rotate(0deg)}50%{filter:hue-rotate(var(--sm-hue)) saturate(var(--sm-saturation))}100%{filter:hue-rotate(calc(var(--sm-hue) * -.7))}}@keyframes smSiteShimmer{0%,100%{background-position:0 0;filter:brightness(.98)}50%{background-position:var(--sm-shift) calc(var(--sm-shift) * -.25);filter:brightness(var(--sm-bright))}}@keyframes smSiteDepth{0%,100%{filter:contrast(1) saturate(.95)}50%{filter:contrast(var(--sm-bright)) saturate(var(--sm-saturation))}}@keyframes smSiteGlow{0%,100%{filter:brightness(.94) saturate(.95)}50%{filter:brightness(var(--sm-bright)) saturate(var(--sm-saturation))}}@keyframes smRevealFade{from{opacity:0}to{opacity:1}}@keyframes smRevealUp{from{opacity:0;translate:0 28px}to{opacity:1;translate:0 0}}@keyframes smRevealLeft{from{opacity:0;translate:-36px 0}to{opacity:1;translate:0 0}}@keyframes smRevealRight{from{opacity:0;translate:36px 0}to{opacity:1;translate:0 0}}@keyframes smRevealZoom{from{opacity:0;scale:.96}to{opacity:1;scale:1}}@keyframes smRevealBounce{0%{opacity:0;scale:.86}65%{opacity:1;scale:1.025}100%{opacity:1;scale:1}}"
        }
      </style>
    );
    const elementAnimationStyles = (
      <style>
        {
          "@keyframes smElementFlip{from{opacity:0;transform:perspective(700px) rotateX(-85deg)}to{opacity:1;transform:perspective(700px) rotateX(0)}}@keyframes smElementRotate{from{opacity:0;transform:rotate(-22deg) scale(.8)}to{opacity:1;transform:rotate(0) scale(1)}}@keyframes smElementType{from{clip-path:inset(0 100% 0 0)}to{clip-path:inset(0 0 0 0)}}@keyframes smElementStagger{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}@keyframes smElementFade{from{opacity:0}to{opacity:1}}@keyframes smElementUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}@keyframes smElementLeft{from{opacity:0;transform:translateX(-26px)}to{opacity:1;transform:translateX(0)}}@keyframes smElementRight{from{opacity:0;transform:translateX(26px)}to{opacity:1;transform:translateX(0)}}@keyframes smElementZoom{from{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}@keyframes smElementBounce{0%{opacity:0;transform:scale(.85)}65%{opacity:1;transform:scale(1.04)}100%{opacity:1;transform:scale(1)}}"
        }
      </style>
    );
    const hasOverride =
      breakpoint !== "desktop" &&
      elements.some((element) => element.responsive?.[breakpoint]);
    const autoStack = mobileMode && !hasOverride;

    if (autoStack) {
      const reorderMobile = (event, target) => {
        const draggedId = event.dataTransfer.getData(
          "application/x-toolvoid-mobile-element",
        );
        if (!editable || !draggedId || draggedId === target.id) return;
        event.preventDefault();
        const bounds = event.currentTarget.getBoundingClientRect();
        const after = event.clientY > bounds.top + bounds.height / 2;
        onUpdateElement?.(section.id, draggedId, {
          y: target.y + (after ? 1 : -1),
        });
      };
      return (
        <>
          {animationStyles}
          <section
            className="sm-mobile-section"
            style={{
              ...sectionStyle,
              width: "100%",
              height: "auto",
              minHeight: height,
              padding: "40px 24px",
              animation:
                [backgroundAnimation, revealAnimation]
                  .filter(Boolean)
                  .join(", ") || undefined,
            }}
            onClick={() => editable && onSelectElement?.(null)}
          >
            <BackgroundObjectsLayer objects={section.backgroundObjects} />
            {editable && (
              <div
                style={{
                  position: "sticky",
                  top: 8,
                  zIndex: 30,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 5,
                  marginBottom: 18,
                  padding: 7,
                  borderRadius: 9,
                  background: "#191727",
                  boxShadow: "0 7px 20px rgba(0,0,0,.28)",
                }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={() => onSelectElement?.(null)}
                  style={{
                    border: 0,
                    borderRadius: 6,
                    padding: "6px 8px",
                    background: "rgba(167,139,250,.25)",
                    color: "#ede9fe",
                    fontWeight: 700,
                    fontSize: 10,
                  }}
                >
                  ✦ Background & animation
                </button>
                {["heading", "text", "image", "button", "shape", "video", "carousel"].map(
                  (elementType) => (
                    <button
                      type="button"
                      key={elementType}
                      onClick={() => onAddElement?.(section.id, elementType)}
                      style={{
                        border: 0,
                        borderRadius: 6,
                        padding: "6px 7px",
                        background: "rgba(255,255,255,.08)",
                        color: "#ede9fe",
                        fontSize: 10,
                      }}
                    >
                      {TOOL_LABELS[elementType]}
                    </button>
                  ),
                )}
              </div>
            )}
            <div className="sm-mobile-kicker">
              {icon} {label} {editable && "· drag blocks to reorder"}
            </div>
            {elements.map((element, index) => {
              const selected = selectedElementIds.length
                ? selectedElementIds.includes(element.id)
                : element.id === selectedElementId;
              const contentChange = (content) =>
                onUpdateElement?.(section.id, element.id, { content });
              const mediaChange = (media) =>
                onUpdateElement?.(section.id, element.id, {
                  content: media.url,
                  media,
                });
              const minHeight = ["image", "video"].includes(element.type)
                ? 220
                : element.type === "shape"
                  ? 170
                  : element.type === "form"
                    ? 220
                    : element.type === "code"
                      ? 160
                      : element.type === "button"
                        ? 48
                        : undefined;
              return (
                <div
                  draggable={editable}
                  key={element.id}
                  className={`sm-mobile-element ${element.type}`}
                  onDragStart={(event) => {
                    if (editable)
                      event.dataTransfer.setData(
                        "application/x-toolvoid-mobile-element",
                        element.id,
                      );
                  }}
                  onDragOver={(event) => editable && event.preventDefault()}
                  onDrop={(event) => reorderMobile(event, element)}
                  onClick={(event) => {
                    if (!editable) return;
                    event.stopPropagation();
                    onSelectElement?.(element.id, event.shiftKey);
                  }}
                  style={{
                    minHeight,
                    animation: elementAnimation(element, index),
                    outline:
                      selected && editable
                        ? "2px solid #a78bfa"
                        : "2px solid transparent",
                    outlineOffset: 5,
                    borderRadius: 6,
                    cursor: editable ? "grab" : "default",
                  }}
                >
                  <span
                    style={{
                      display: editable ? "block" : "none",
                      marginBottom: 6,
                      color: "#c4b5fd",
                      font: "700 10px DM Mono, monospace",
                    }}
                  >
                    ⋮⋮ Drag to reorder
                  </span>
                  <ElementContent
                    element={element}
                    editable={editable}
                    selected={selected}
                    onChange={contentChange}
                  onMediaChange={mediaChange}
                  onNavigatePage={onNavigatePage}
                  />
                </div>
              );
            })}
          </section>
        </>
      );
    }

    const dropElement = (event) => {
      const elementType = event.dataTransfer.getData(
        "application/x-toolvoid-element",
      );
      if (!editable || !elementType) return;
      event.preventDefault();
      const bounds = event.currentTarget.getBoundingClientRect();
      onAddElement?.(section.id, elementType, {
        x: Math.round((event.clientX - bounds.left) / scale),
        y: Math.round((event.clientY - bounds.top) / scale),
      });
    };
    const snapPosition = (elementId, rawPosition) => {
      const moving = elements.find((element) => element.id === elementId);
      if (!moving) return { ...rawPosition, guides: {} };
      const movingPosition = moving.responsive?.[breakpoint] || moving;
      const point = { x: rawPosition.x, y: rawPosition.y };
      const guide = {};
      const snap = 8;
      elements
        .filter((element) => element.id !== elementId)
        .forEach((element) => {
          const other = element.responsive?.[breakpoint] || element;
          const movingX = [
            point.x,
            point.x + movingPosition.width / 2,
            point.x + movingPosition.width,
          ];
          const movingY = [
            point.y,
            point.y + movingPosition.height / 2,
            point.y + movingPosition.height,
          ];
          const otherX = [
            other.x,
            other.x + other.width / 2,
            other.x + other.width,
          ];
          const otherY = [
            other.y,
            other.y + other.height / 2,
            other.y + other.height,
          ];
          movingX.forEach((value, index) =>
            otherX.forEach((target) => {
              if (Math.abs(value - target) <= snap) {
                point.x += target - value;
                guide.x = target;
              }
            }),
          );
          movingY.forEach((value, index) =>
            otherY.forEach((target) => {
              if (Math.abs(value - target) <= snap) {
                point.y += target - value;
                guide.y = target;
              }
            }),
          );
        });
      return { x: Math.round(point.x), y: Math.round(point.y), guides: guide };
    };
    return (
      <div style={{ height: height * scale, position: "relative" }}>
        {animationStyles}
        <section
          ref={sectionRef}
          style={{
            ...sectionStyle,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          onClick={() => onSelectElement?.(null)}
          onDragOver={(event) => editable && event.preventDefault()}
          onDrop={dropElement}
        >
          <BackgroundObjectsLayer objects={section.backgroundObjects} />
          {editable && (
            <div
              className="sm-section-add-elements"
              style={{
                right: 12,
                bottom: 12,
                maxWidth: 720,
                flexWrap: "wrap",
                padding: 8,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <span
                className="sm-add-title"
                style={{ width: "100%", marginBottom: 3 }}
              >
                Add & drop anywhere
              </span>
              <button
                type="button"
                style={{
                  width: "auto",
                  height: 28,
                  padding: "0 8px",
                  gap: 4,
                  fontSize: 10,
                  background: "rgba(167,139,250,.22)",
                }}
                onClick={() => onSelectElement?.(null)}
              >
                ✦ Background & animation
              </button>
              {[
                "heading",
                "text",
                "image",
                "button",
                "icon",
                "shape",
                "divider",
                "video",
                "form",
                "social",
                "code",
                "carousel",
              ].map((elementType) => (
                <button
                  draggable
                  style={{
                    width: "auto",
                    height: 28,
                    padding: "0 7px",
                    gap: 4,
                    fontSize: 10,
                  }}
                  key={elementType}
                  title={`Drag ${elementType} onto the canvas`}
                  onDragStart={(event) =>
                    event.dataTransfer.setData(
                      "application/x-toolvoid-element",
                      elementType,
                    )
                  }
                  onClick={() => onAddElement?.(section.id, elementType)}
                >
                  <span className="sm-add-icon">
                    {elementType === "image" ? (
                      <ImagePlus size={13} />
                    ) : elementType === "icon" ? (
                      <Layers3 size={13} />
                    ) : elementType === "text" ? (
                      <Type size={13} />
                    ) : elementType === "button" ? (
                      <Copy size={13} />
                    ) : (
                      <PlusGlyph type={elementType} />
                    )}
                  </span>
                  <span>{TOOL_LABELS[elementType]}</span>
                </button>
              ))}
            </div>
          )}
          {guides.x !== undefined && (
            <i
              style={{
                position: "absolute",
                left: guides.x,
                top: 0,
                bottom: 0,
                width: 1,
                background: "#38bdf8",
                boxShadow: "0 0 7px #38bdf8",
                zIndex: 90,
                pointerEvents: "none",
              }}
            />
          )}
          {guides.y !== undefined && (
            <i
              style={{
                position: "absolute",
                top: guides.y,
                left: 0,
                right: 0,
                height: 1,
                background: "#38bdf8",
                boxShadow: "0 0 7px #38bdf8",
                zIndex: 90,
                pointerEvents: "none",
              }}
            />
          )}
          {elements.map((element, index) => {
            const selected = selectedElementIds.length
              ? selectedElementIds.includes(element.id)
              : element.id === selectedElementId;
            const position = element.responsive?.[breakpoint] || element;
            const update = (patch) =>
              onUpdateElement?.(section.id, element.id, patch);
            const contentChange = (content) => update({ content });
            const body = (
              <div
                className={`sm-element ${selected ? "selected" : ""}`}
                style={{
                  ...elementStyle,
                  width: "100%",
                  height: "100%",
                  zIndex: element.zIndex,
                  animation: elementAnimation(element, index),
                }}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelectElement?.(element.id, event.shiftKey);
                }}
              >
                <ElementContent
                  element={element}
                  editable={editable}
                  selected={selected}
                  onChange={contentChange}
                  onMediaChange={(media) =>
                    update({ content: media.url, media })
                  }
                  onSettingsChange={update}
                  onNavigatePage={onNavigatePage}
                />
                {selected && editable && (
                  <FloatingToolbar
                    element={element}
                    onDelete={() => onDeleteElement?.(section.id, element.id)}
                    onDuplicate={() =>
                      onDuplicateElement?.(section.id, element.id)
                    }
                    onFront={() => onBringToFront?.(section.id, element.id)}
                    onUpdate={update}
                  />
                )}
              </div>
            );
            if (!editable)
              return (
                <div
                  key={element.id}
                  style={{
                    position: "absolute",
                    left: position.x,
                    top: position.y,
                    width: position.width,
                    height: position.height,
                    zIndex: element.zIndex,
                  }}
                >
                  {body}
                </div>
              );
            const savePosition = (patch) =>
              breakpoint === "desktop"
                ? update(patch)
                : update({
                    responsive: {
                      ...(element.responsive || {}),
                      [breakpoint]: {
                        x: patch.x ?? position.x,
                        y: patch.y ?? position.y,
                        width: patch.width ?? position.width,
                        height: patch.height ?? position.height,
                      },
                    },
                  });
            return (
              <Rnd
                key={element.id}
                bounds="parent"
                dragHandleClassName={
                  element.type === "code" ? "sm-custom-drag-handle" : undefined
                }
                size={{ width: position.width, height: position.height }}
                position={{ x: position.x, y: position.y }}
                style={{ zIndex: element.zIndex }}
                disableDragging={Boolean(element.locked)}
                enableResizing={selected && !element.locked}
                onDrag={(_, data) => {
                  const snapped = snapPosition(element.id, data);
                  setGuides(snapped.guides);
                }}
                onDragStop={(_, data) => {
                  setGuides({});
                  savePosition({
                    x: Math.round(data.x),
                    y: Math.round(data.y),
                  });
                }}
                onResizeStop={(_, __, ref, ___, nextPosition) =>
                  savePosition({
                    width: Math.round(ref.offsetWidth),
                    height: Math.round(ref.offsetHeight),
                    x: Math.round(nextPosition.x),
                    y: Math.round(nextPosition.y),
                  })
                }
              >
                {body}
              </Rnd>
            );
          })}
        </section>
      </div>
    );
  };
}
