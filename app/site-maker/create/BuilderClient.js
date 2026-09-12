/* eslint-disable react-hooks/refs -- dnd-kit intentionally supplies ref/listener objects during render. */
"use client";
/* dnd-kit exposes ref/listener objects during render by design; persistence effects intentionally sync external storage. */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Copy,
  Eye,
  EyeOff,
  GripVertical,
  Layers,
  Monitor,
  PanelLeftClose,
  PanelLeftOpen,
  Plus,
  Redo2,
  Smartphone,
  Tablet,
  Trash2,
  Undo2,
  X,
} from "lucide-react";
import SectionRenderer from "../../../components/site-maker/SectionRenderer";
import { createSection } from "../../../components/site-maker/sections/elementDefaults";
import StylePanel from "../../../components/site-maker/style/StylePanel";
import BackgroundControls from "../../../components/site-maker/style/BackgroundControls";
import { buildSiteMakerZip } from "../../../lib/siteMakerExport";

const TYPES = [
  "hero",
  "text",
  "about",
  "gallery",
  "services",
  "testimonials",
  "pricing",
  "faq",
  "partners",
  "contact",
  "support",
  "footer",
  "video",
];
const PROJECT_VERSION = 3;
const DEVICE_SCALE = { desktop: 1, tablet: 0.64, mobile: 1 };
const HOME_PAGE = { id: "home", name: "Home", slug: "/", sections: [] };
const pageId = () => crypto.randomUUID();
const slugify = (value, fallback = "page") =>
  `/${String(value).toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || fallback}`;
let editableHeader = { brand: "Studio", links: "Work   About   Contact" };
let updateEditableHeader = () => {};
const pastePlainText = (event) => {
  event.preventDefault();
  document.execCommand(
    "insertText",
    false,
    event.clipboardData.getData("text/plain"),
  );
};
const elementId = () => crypto.randomUUID();
const addElement = (type, count, position = {}) => ({
  id: elementId(),
  type,
  content:
    type === "heading"
      ? "New heading"
      : type === "text"
        ? "Write anything you want here."
        : type === "button"
          ? "Learn more"
          : type === "icon"
            ? "star"
            : type === "shape"
              ? "rectangle"
              : type === "code"
                ? '<div style="padding:16px;font-family:system-ui">Add your custom HTML here</div>'
                : "",
  images: type === "carousel" ? [] : undefined,
  links:
    type === "social" ? ["instagram", "twitter", "linkedin"] : undefined,
  urls: type === "social" ? {} : undefined,
  autoplay: type === "carousel",
  showDots: true,
  showArrows: true,
  transitionSpeed: 4,
  href: type === "button" ? "" : undefined,
  openInNewTab: false,
  x: Math.max(0, position.x ?? 120 + count * 16),
  y: Math.max(0, position.y ?? 120 + count * 16),
  width:
    type === "heading"
      ? 520
      : type === "text"
        ? 440
        : ["image", "video", "carousel"].includes(type)
          ? 280
          : type === "form"
            ? 300
            : type === "social"
              ? 200
              : type === "code"
                ? 380
                : type === "shape"
                  ? 170
                  : 150,
  height:
    type === "heading"
      ? 120
      : type === "text"
        ? 72
        : ["image", "video", "carousel"].includes(type)
          ? 180
          : type === "form"
            ? 220
            : type === "social"
              ? 54
              : type === "code"
                ? 160
                : type === "shape"
                  ? 170
                  : 46,
  zIndex: count + 5,
  style: {
    fontFamily: type === "heading" ? "Syne" : "Inter",
    fontSize: type === "heading" ? 42 : type === "code" ? 13 : 18,
    fontWeight: type === "heading" ? 800 : 400,
    textAlign: "left",
    color:
      type === "button" ? "#1e1b4b" : type === "code" ? "#e9d5ff" : "#ffffff",
    backgroundColor:
      type === "button"
        ? "#ffffff"
        : type === "shape"
          ? "#a78bfa"
          : type === "code"
            ? "#111827"
            : "transparent",
    borderWidth: type === "shape" ? 1 : 0,
    borderStyle: type === "shape" ? "solid" : "none",
    borderColor: type === "shape" ? "#c4b5fd" : "#ffffff",
    borderRadius: type === "button" ? 999 : 14,
    boxShadow: "none",
    opacity: 1,
  },
  responsive: { tablet: null, mobile: null },
  locked: false,
});

function IconButton({
  label,
  children,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      {...props}
      className={`sm-icon ${className}`}
      aria-label={label}
      title={label}
      disabled={Boolean(disabled)}
    >
      {children}
    </button>
  );
}
function Thumbnail({ type }) {
  return (
    <span className={`sm-thumbnail ${type}`}>
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
// dnd-kit requires reading these during render.
function SortableLayer({
  section,
  selected,
  selectedIds = [],
  onSelect,
  onSelectElement = () => {},
  onToggle,
  onToggleLock = () => {},
  onDelete,
}) {
  const d = useSortable({ id: `layer-${section.id}` });
  const elements = Array.isArray(section.elements) ? section.elements : [];
  return (
    <div
      ref={d.setNodeRef}
      style={{
        transform: CSS.Transform.toString(d.transform),
        transition: d.transition,
      }}
    >
      <div
        className={`sm-layer ${selected ? "active" : ""}`}
        onClick={() => onSelect(section.id)}
      >
        <button {...d.attributes} {...d.listeners} className="sm-grip">
          <GripVertical size={14} />
        </button>
        <span>{section.type}</span>
        <IconButton
          label="Toggle visibility"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(section.id);
          }}
        >
          {section.hidden ? <EyeOff size={14} /> : <Eye size={14} />}
        </IconButton>
        <IconButton
          label="Delete section"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(section.id);
          }}
        >
          <Trash2 size={14} />
        </IconButton>
      </div>
      {selected && (
        <div className="sm-layer-children">
          {elements
            .slice()
            .sort((a, b) => b.zIndex - a.zIndex)
            .map((element) => (
              <div
                role="button"
                tabIndex={0}
                key={element.id}
                className={`sm-layer-element ${selectedIds.includes(element.id) ? "active" : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelectElement(section.id, element.id, event.shiftKey);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ")
                    onSelectElement(section.id, element.id, event.shiftKey);
                }}
              >
                <span>{element.type}</span>
                <IconButton
                  label={element.locked ? "Unlock element" : "Lock element"}
                  onClick={(event) => {
                    event.stopPropagation();
                    onToggleLock(section.id, element.id);
                  }}
                >
                  {element.locked ? "🔒" : "○"}
                </IconButton>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
// dnd-kit requires reading these during render.
function SortableSection({
  section,
  selectedElementId,
  selectedElementIds,
  onElementSelect,
  actions,
  scale,
  mobileMode,
  breakpoint,
}) {
  const d = useSortable({ id: `canvas-${section.id}` });
  return (
    <div
      ref={d.setNodeRef}
      style={{
        transform: CSS.Transform.toString(d.transform),
        transition: d.transition,
        opacity: d.isDragging ? 0.5 : 1,
      }}
      className="sm-canvas-section"
    >
      <div className="sm-section-drag" {...d.attributes} {...d.listeners}>
        <GripVertical size={15} />
      </div>
      <SectionRenderer
        section={section}
        editable
        breakpoint={breakpoint}
        mobileMode={mobileMode}
        selectedElementId={selectedElementId}
        selectedElementIds={selectedElementIds}
        onSelectElement={(id, multi) =>
          onElementSelect({
            sectionId: section.id,
            elementId: id || null,
            multi,
          })
        }
        {...actions}
        scale={scale}
      />
    </div>
  );
}

export default function SiteMakerPage() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [pages, setPages] = useState([HOME_PAGE]),
    ref = useRef([HOME_PAGE]);
  const [activePageId, setActivePageId] = useState(HOME_PAGE.id);
  const [picked, setPicked] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [clipboard, setClipboard] = useState([]);
  const [tab, setTab] = useState("add");
  const [left, setLeft] = useState(true);
  const [device, setDevice] = useState("desktop");
  const [preview, setPreview] = useState(false);
  const [siteName, setSiteName] = useState("Untitled site");
  const [undoStack, setUndo] = useState([]),
    [redoStack, setRedo] = useState([]);
  const projectInput = useRef(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
  );
  const [siteHeader, setSiteHeader] = useState({
    brand: "Studio",
    links: "Work   About   Contact",
    navLinks: [],
  });
  useEffect(() => {
    editableHeader = siteHeader;
    updateEditableHeader = (key, value) => {
      editableHeader = { ...editableHeader, [key]: value };
      setSiteHeader(editableHeader);
    };
  }, [siteHeader]);
  const activePage = pages.find((page) => page.id === activePageId) || pages[0] || HOME_PAGE;
  const sections = useMemo(() => activePage.sections || [], [activePage]);
  const visible = sections.filter((s) => !s.hidden),
    layerIds = useMemo(() => sections.map((s) => `layer-${s.id}`), [sections]);
  const selectedSection = sections.find((s) => s.id === picked?.sectionId);
  const saveProjectFile = () => {
    const project = {
      version: PROJECT_VERSION,
      name: siteName,
      header: siteHeader,
      pages,
      exportedAt: new Date().toISOString(),
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(project, null, 2)], {
        type: "application/json",
      }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = `${siteName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "site"}-project.json`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const loadProjectFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const project = JSON.parse(String(reader.result));
        const next = Array.isArray(project.pages)
          ? project.pages
          : Array.isArray(project.sections)
            ? [{ ...HOME_PAGE, sections: project.sections }]
            : null;
        if (!next?.length) throw new Error("Missing pages");
        ref.current = next;
        setPages(next);
        setActivePageId(next[0].id);
        setSiteName(
          typeof project.name === "string" ? project.name : "Untitled site",
        );
        if (project.header && typeof project.header === "object")
          setSiteHeader({
            brand: project.header.brand || "Studio",
            links: project.header.links || "Work   About   Contact",
            navLinks: Array.isArray(project.header.navLinks)
              ? project.header.navLinks
              : [],
          });
        setPicked(null);
        setSelectedIds([]);
        setUndo([]);
        setRedo([]);
      } catch {
        alert("This is not a valid ToolVoid Site Maker project file.");
      }
    };
    reader.readAsText(file);
  };
  const commitPages = useCallback((next) => {
    setUndo((s) => [...s, ref.current].slice(-60));
    setRedo([]);
    ref.current = next;
    setPages(next);
  }, []);
  const commit = useCallback((next) => {
    commitPages(ref.current.map((page) => page.id === activePageId ? { ...page, sections: next } : page));
  }, [activePageId, commitPages]);
  const mutate = useCallback(
    (sectionId, fn) =>
      commit((ref.current.find((page) => page.id === activePageId)?.sections || []).map((s) => (s.id === sectionId ? fn(s) : s))),
    [activePageId, commit],
  );
  const create = (type) => {
    const s = createSection(type);
    commit([...sections, s]);
    setPicked({ sectionId: s.id, elementId: s.elements[0].id });
  };
  const switchPage = (id) => {
    setActivePageId(id);
    setPicked(null);
    setSelectedIds([]);
  };
  const addPage = () => {
    const name = prompt("Page name", "New page");
    if (!name?.trim()) return;
    const baseSlug = slugify(name);
    const existing = new Set(ref.current.map((page) => page.slug));
    let slug = baseSlug, count = 2;
    while (existing.has(slug)) slug = `${baseSlug}-${count++}`;
    const page = { id: pageId(), name: name.trim(), slug, sections: [] };
    commitPages([...ref.current, page]);
    if (confirm(`Add “${page.name}” to the site navigation?`)) {
      setSiteHeader((header) => ({
        ...header,
        navLinks: [...(header.navLinks || []), { pageId: page.id, label: page.name }],
      }));
    }
    switchPage(page.id);
  };
  const renamePage = () => {
    const name = prompt("Page name", activePage.name);
    if (!name?.trim()) return;
    commitPages(ref.current.map((page) => page.id === activePage.id ? { ...page, name: name.trim() } : page));
  };
  const deletePage = () => {
    if (ref.current.length === 1 || !confirm(`Delete ${activePage.name}?`)) return;
    const next = ref.current.filter((page) => page.id !== activePage.id);
    commitPages(next);
    switchPage(next[0].id);
  };
  const movePage = (direction) => {
    const index = ref.current.findIndex((page) => page.id === activePage.id);
    const target = index + direction;
    if (target < 0 || target >= ref.current.length) return;
    commitPages(arrayMove(ref.current, index, target));
  };
  const remove = (id) => {
    commit(sections.filter((s) => s.id !== id));
    if (picked?.sectionId === id) setPicked(null);
  };
  const reorder = (active, over, source) => {
    if (!over || active === over) return;
    const all = sections;
    if (source === "layers") {
      const a = all.findIndex((s) => s.id === active),
        b = all.findIndex((s) => s.id === over);
      commit(arrayMove(all, a, b));
      return;
    }
    const a = visible.findIndex((s) => s.id === active),
      b = visible.findIndex((s) => s.id === over),
      sorted = arrayMove(visible, a, b);
    let i = 0;
    commit(all.map((s) => (s.hidden ? s : sorted[i++])));
  };
  const undo = useCallback(() => {
    if (!undoStack.length) return;
    const n = undoStack.at(-1);
    setUndo((s) => s.slice(0, -1));
    setRedo((s) => [...s, ref.current]);
    ref.current = n;
    setPages(n);
  }, [undoStack]);
  const redo = useCallback(() => {
    if (!redoStack.length) return;
    const n = redoStack.at(-1);
    setRedo((s) => s.slice(0, -1));
    setUndo((s) => [...s, ref.current]);
    ref.current = n;
    setPages(n);
  }, [redoStack]);
  const selectElement = (sectionId, elementId, multi = false) => {
    setPicked({ sectionId, elementId: elementId || null });
    if (!elementId) {
      setSelectedIds([]);
      return;
    }
    setSelectedIds((ids) =>
      multi
        ? ids.includes(elementId)
          ? ids.filter((id) => id !== elementId)
          : [...ids, elementId]
        : [elementId],
    );
  };
  const toggleLock = (sid, eid) =>
    mutate(sid, (s) => ({
      ...s,
      elements: s.elements.map((e) =>
        e.id === eid ? { ...e, locked: !e.locked } : e,
      ),
    }));
  const deleteSelected = useCallback(() => {
    if (!selectedIds.length || !picked) return;
    mutate(picked.sectionId, (s) => ({
      ...s,
      elements: s.elements.filter(
        (e) => !selectedIds.includes(e.id) || e.locked,
      ),
    }));
    setSelectedIds([]);
    setPicked(null);
  }, [mutate, picked, selectedIds]);
  const copySelected = useCallback(() => {
    if (!picked) return;
    const s = ref.current.find((page) => page.id === activePageId)?.sections.find((x) => x.id === picked.sectionId);
    setClipboard(
      s.elements
        .filter((e) => selectedIds.includes(e.id))
        .map((e) => ({ ...e, style: { ...e.style } })),
    );
  }, [activePageId, picked, selectedIds]);
  const pasteSelected = useCallback(() => {
    if (!clipboard.length || !picked) return;
    mutate(picked.sectionId, (s) => ({
      ...s,
      elements: [
        ...s.elements,
        ...clipboard.map((e, i) => ({
          ...e,
          id: elementId(),
          x: e.x + 20 + i * 8,
          y: e.y + 20 + i * 8,
        })),
      ],
    }));
  }, [clipboard, mutate, picked]);
  useEffect(() => {
    const button = document.querySelector(".sm-export");
    if (!button) return undefined;
    const exportSite = async () => {
      if (button.disabled) return;
      button.disabled = true;
      button.textContent = "Building…";
      try {
        const blob = await buildSiteMakerZip(siteName, pages);
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${siteName.toLowerCase().replace(/[^a-z0-9]+/g, "-") || "site"}-export.zip`;
        link.click();
        URL.revokeObjectURL(url);
      } finally {
        button.disabled = false;
        button.textContent = "Export ZIP";
      }
    };
    button.disabled = false;
    button.textContent = "Export ZIP";
    button.addEventListener("click", exportSite);
    return () => button.removeEventListener("click", exportSite);
  }, [siteName, pages]);
  useEffect(() => {
    const key = (e) => {
      const target = e.target;
      const isTyping =
        target instanceof HTMLElement &&
        (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
          target.isContentEditable);
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "z" &&
        !isTyping
      ) {
        e.preventDefault();
        e.shiftKey ? redo() : undo();
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "c" &&
        !isTyping
      ) {
        e.preventDefault();
        copySelected();
      }
      if (
        (e.ctrlKey || e.metaKey) &&
        e.key.toLowerCase() === "v" &&
        !isTyping
      ) {
        e.preventDefault();
        pasteSelected();
      }
      if ((e.key === "Delete" || e.key === "Backspace") && !isTyping) {
        e.preventDefault();
        deleteSelected();
      }
    };
    addEventListener("keydown", key);
    return () => removeEventListener("keydown", key);
  }, [
    undoStack,
    redoStack,
    selectedIds,
    clipboard,
    picked,
    copySelected,
    deleteSelected,
    pasteSelected,
    redo,
    undo,
  ]);
  const actions = {
    onUpdateElement: (sid, eid, patch) =>
      mutate(sid, (s) => ({
        ...s,
        elements: s.elements.map((e) =>
          e.id === eid ? { ...e, ...patch } : e,
        ),
      })),
    onDeleteElement: (sid, eid) => {
      const target = ref.current
        .find((page) => page.id === activePageId)?.sections
        .find((s) => s.id === sid)
        ?.elements.find((e) => e.id === eid);
      if (target?.locked) return;
      mutate(sid, (s) => ({
        ...s,
        elements: s.elements.filter((e) => e.id !== eid),
      }));
      if (picked?.elementId === eid) setPicked(null);
    },
    onDuplicateElement: (sid, eid) =>
      mutate(sid, (s) => {
        const i = s.elements.findIndex((e) => e.id === eid),
          copy = {
            ...s.elements[i],
            id: elementId(),
            x: s.elements[i].x + 24,
            y: s.elements[i].y + 24,
            zIndex: Math.max(...s.elements.map((e) => e.zIndex)) + 1,
          };
        return {
          ...s,
          elements: [
            ...s.elements.slice(0, i + 1),
            copy,
            ...s.elements.slice(i + 1),
          ],
        };
      }),
    onBringToFront: (sid, eid) =>
      mutate(sid, (s) => ({
        ...s,
        elements: s.elements.map((e) =>
          e.id === eid
            ? { ...e, zIndex: Math.max(...s.elements.map((x) => x.zIndex)) + 1 }
            : e,
        ),
      })),
    onAddElement: (sid, type, position) =>
      mutate(sid, (s) => ({
        ...s,
        elements: [
          ...s.elements,
          addElement(type, s.elements.length, position),
        ],
      })),
  };
  // The editor uses browser-only drag/drop libraries. Render the same inert shell on the server and
  // the first client pass, then initialise the interactive canvas after hydration.
  if (!mounted)
    return (
      <div className="sm-root">
        <style>{styles}</style>
        <div
          style={{
            height: "100%",
            display: "grid",
            placeItems: "center",
            color: "#c4b5fd",
            font: "700 1rem Syne, sans-serif",
            letterSpacing: ".02em",
          }}
        >
          Loading Site Maker…
        </div>
      </div>
    );
  if (preview)
    return (
      <div className="sm-preview">
        <style>{styles}</style>
        <button onClick={() => setPreview(false)}>Exit preview</button>
        <Site device={device} sections={visible} pages={pages} headerNavLinks={siteHeader.navLinks} preview onNavigatePage={switchPage} />
      </div>
    );
  return (
    <div className="sm-root">
      <style>{styles}</style>
      <header>
        <div className="sm-title">
          <IconButton label="Toggle panel" onClick={() => setLeft(!left)}>
            {left ? <PanelLeftClose size={16} /> : <PanelLeftOpen size={16} />}
          </IconButton>
          <b>✦</b>
          <input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
          />
          <div className="sm-page-switcher">
            <select value={activePage.id} onChange={(e) => switchPage(e.target.value)} aria-label="Current page">
              {pages.map((page) => <option key={page.id} value={page.id}>{page.name}{page.slug === "/" ? " (Home)" : ""}</option>)}
            </select>
            <button type="button" onClick={addPage} title="Add page">+</button>
            <button type="button" onClick={renamePage} title="Rename page">Rename</button>
            <button type="button" onClick={() => movePage(-1)} title="Move page earlier">↑</button>
            <button type="button" onClick={() => movePage(1)} title="Move page later">↓</button>
            <button type="button" onClick={deletePage} disabled={pages.length === 1} title="Delete page">×</button>
          </div>
        </div>
        <div className="sm-bar">
          <IconButton label="Undo" disabled={!undoStack.length} onClick={undo}>
            <Undo2 size={16} />
          </IconButton>
          <IconButton label="Redo" disabled={!redoStack.length} onClick={redo}>
            <Redo2 size={16} />
          </IconButton>
          {[
            ["desktop", Monitor],
            ["tablet", Tablet],
            ["mobile", Smartphone],
          ].map(([id, Icon]) => (
            <IconButton
              key={id}
              label={id}
              className={device === id ? "sm-icon active" : "sm-icon"}
              onClick={() => setDevice(id)}
            >
              <Icon size={16} />
            </IconButton>
          ))}
          <button className="sm-plain" onClick={() => setPreview(true)}>
            <Eye size={15} /> Preview
          </button>
          <button className="sm-plain" onClick={saveProjectFile}>Save project</button>
          <button className="sm-plain" onClick={() => projectInput.current?.click()}>Load project</button>
          <input ref={projectInput} type="file" accept="application/json,.json" hidden onChange={loadProjectFile} />
          <button className="sm-export" disabled>
            Export
          </button>
        </div>
      </header>
      <div className="sm-body">
        {left && (
          <aside className="sm-left">
            <nav>
              <button
                className={tab === "add" ? "active" : ""}
                onClick={() => setTab("add")}
              >
                <Plus size={15} /> Add section
              </button>
              <button
                className={tab === "layers" ? "active" : ""}
                onClick={() => setTab("layers")}
              >
                <Layers size={15} /> Layers
              </button>
            </nav>
            {tab === "add" ? (
              <div className="sm-palette">
                {TYPES.map((type) => (
                  <button key={type} onClick={() => create(type)}>
                    <Thumbnail type={type} />
                    <span>{type}</span>
                  </button>
                ))}
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={({ active, over }) =>
                  reorder(
                    String(active.id).replace("layer-", ""),
                    String(over?.id || "").replace("layer-", ""),
                    "layers",
                  )
                }
              >
                <SortableContext
                  items={layerIds}
                  strategy={verticalListSortingStrategy}
                >
                  {sections.map((s) => (
                    <SortableLayer
                      key={s.id}
                      section={s}
                      selected={s.id === picked?.sectionId}
                      selectedIds={selectedIds}
                      onSelect={(id) =>
                        setPicked({ sectionId: id, elementId: null })
                      }
                      onSelectElement={(sid, eid, multi) =>
                        selectElement(sid, eid, multi)
                      }
                      onToggle={(id) =>
                        mutate(id, (s) => ({ ...s, hidden: !s.hidden }))
                      }
                      onToggleLock={toggleLock}
                      onDelete={remove}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </aside>
        )}
        <main className="sm-stage">
          <Site
            device={device}
            sections={visible}
            pages={pages}
            headerNavLinks={siteHeader.navLinks}
            selected={picked}
            selectedElementIds={selectedIds}
            sensors={sensors}
            onElementSelect={(next) =>
              next
                ? selectElement(next.sectionId, next.elementId, next.multi)
                : (setPicked(null), setSelectedIds([]))
            }
            onNavigatePage={switchPage}
            actions={actions}
            onDragEnd={({ active, over }) =>
              reorder(
                String(active.id).replace("canvas-", ""),
                String(over?.id || "").replace("canvas-", ""),
                "canvas",
              )
            }
          />
        </main>
        {selectedSection && (
          <Inspector
            section={selectedSection}
            picked={picked}
            pages={pages}
            close={() => {
              setPicked(null);
              setSelectedIds([]);
            }}
            change={mutate}
          />
        )}
      </div>
    </div>
  );
}

function Site({
  device,
  sections,
  pages = [],
  headerNavLinks = [],
  selected,
  selectedElementIds,
  sensors,
  onDragEnd,
  onElementSelect,
  actions,
  preview,
  onNavigatePage,
}) {
  const mobile = device === "mobile" || (preview && device !== "desktop");
  const scale = DEVICE_SCALE[device];
  const editable = !preview;
  const updateHeader = (key, event) =>
    updateEditableHeader(
      key,
      event.currentTarget.textContent
        .replace(/\s+/g, " ")
        .replace(/^✦\s*/, "")
        .trim(),
    );
  return (
    <div className={`sm-site-shell ${device}`}>
      <div className="sm-site">
        <div className="sm-site-nav">
          <b
            className="sm-editable-nav"
            title={editable ? "Click to edit brand" : undefined}
            style={{
              cursor: editable ? "text" : "default",
              outline: "none",
              padding: editable ? "5px 7px" : 0,
              borderRadius: 6,
            }}
            contentEditable={editable}
            suppressContentEditableWarning
            onPaste={pastePlainText}
            onBlur={(event) => updateHeader("brand", event)}
          >
            ✦ {editableHeader.brand}
          </b>
          {headerNavLinks.length ? (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {headerNavLinks.map((link) => (
                <button
                  type="button"
                  key={link.pageId}
                  onClick={() => onNavigatePage?.(link.pageId)}
                  style={{ border: 0, background: "transparent", color: "inherit", cursor: "pointer", fontSize: "inherit" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          ) : (
            <span
              className="sm-editable-nav sm-editable-links"
              title={editable ? "Click to edit navigation labels" : undefined}
              style={{
                cursor: editable ? "text" : "default",
                outline: "none",
                padding: editable ? "5px 7px" : 0,
                borderRadius: 6,
                whiteSpace: "pre-wrap",
              }}
              contentEditable={editable}
              suppressContentEditableWarning
              onPaste={pastePlainText}
              onBlur={(event) => updateHeader("links", event)}
            >
              {editableHeader.links}
            </span>
          )}
        </div>
        {sections.length ? (
          preview ? (
            <>
              {sections.map((section) => (
                <SectionRenderer
                  key={section.id}
                  section={section}
                  mobileMode={mobile}
                  breakpoint={device}
                  scale={scale}
                  onNavigatePage={onNavigatePage}
                />
              ))}
            </>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={onDragEnd}
            >
              <SortableContext
                items={sections.map((section) => `canvas-${section.id}`)}
                strategy={verticalListSortingStrategy}
              >
                {sections.map((section) => (
                  <SortableSection
                    key={section.id}
                    section={section}
                    breakpoint={device}
                    mobileMode={device === "mobile"}
                    selectedElementId={
                      selected?.sectionId === section.id
                        ? selected.elementId
                        : null
                    }
                    selectedElementIds={
                      selected?.sectionId === section.id
                        ? selectedElementIds
                        : []
                    }
                    onElementSelect={onElementSelect}
                    actions={actions}
                    scale={scale}
                  />
                ))}
              </SortableContext>
            </DndContext>
          )
        ) : (
          <div className="sm-empty">
            <strong>Add your first section to get started.</strong>
            <span>← Choose a card from the left panel</span>
          </div>
        )}
        {!sections.some((section) => section.type === "footer") && (
          <footer>Built with ToolVoid Site Maker</footer>
        )}
      </div>
    </div>
  );
}
const linkChoiceStyle = (active) => ({
  display: "grid",
  gap: 3,
  width: "100%",
  padding: "11px 12px",
  border: `1px solid ${active ? "#a78bfa" : "rgba(255,255,255,.12)"}`,
  borderRadius: 9,
  background: active ? "rgba(167,139,250,.16)" : "#181824",
  color: active ? "#ede9fe" : "#d1d5db",
  textAlign: "left",
  cursor: "pointer",
});

function Inspector({ section, picked, pages = [], close, change }) {
  const [tab, setTab] = useState(picked.elementId ? "content" : "design");
  const activeTab = picked.elementId ? tab : "design";
  const element = (section.elements || []).find(
    (e) => e.id === picked.elementId,
  );
  const updateSection = (patch) =>
    change(section.id, (s) => ({ ...s, ...patch }));
  const updateElement = (patch) =>
    change(section.id, (s) => ({
      ...s,
      elements: (s.elements || []).map((x) =>
        x.id === element.id ? { ...x, ...patch } : x,
      ),
    }));
  const editor = element ? (
    <>
      {tab === "content" ? (
        <>
          <label>
            Content
            {["text", "code"].includes(element.type) ? (
              <textarea
                value={element.content}
                onChange={(e) => updateElement({ content: e.target.value })}
              />
            ) : (
              <input
                value={element.content}
                onChange={(e) => updateElement({ content: e.target.value })}
              />
            )}
          </label>
          <p>Drag or resize this element directly on the canvas.</p>
          {element.type === "button" && (
            <>
              <span className="sm-field-label">Where should this button go?</span>
              <div className="sm-link-type-choice" style={{ display: "grid", gap: 8 }}>
                <button
                  type="button"
                  className={(element.linkType || "external") === "external" ? "active" : ""}
                  onClick={() => updateElement({ linkType: "external" })}
                  style={linkChoiceStyle((element.linkType || "external") === "external")}
                >
                  <strong>↗ Open a Website</strong>
                  <small>Send visitors to any web address.</small>
                </button>
                <button
                  type="button"
                  className={element.linkType === "page" ? "active" : ""}
                  onClick={() => updateElement({ linkType: "page" })}
                  style={linkChoiceStyle(element.linkType === "page")}
                >
                  <strong>▣ Go to Another Page in This Site</strong>
                  <small>Take visitors to one of your own pages.</small>
                </button>
              </div>
              {element.linkType === "page" ? (
                <label>
                  Choose a page
                  <select value={element.pageId || ""} onChange={(e) => updateElement({ pageId: e.target.value })}>
                    <option value="">Choose a page</option>
                    {pages.map((page) => <option key={page.id} value={page.id}>▣ {page.name}</option>)}
                  </select>
                </label>
              ) : (
                <label>Website address<input value={element.href || ""} placeholder="https://…" onChange={(e) => updateElement({ href: e.target.value })} /></label>
              )}
              <label style={{ display: "flex", textTransform: "none" }}><input type="checkbox" checked={Boolean(element.openInNewTab)} onChange={(e) => updateElement({ openInNewTab: e.target.checked })} /> Open in new tab</label>
            </>
          )}
          {element.type === "social" && <><label>Platforms (comma-separated)<input value={(element.links || ["instagram", "twitter", "linkedin"]).join(", ")} onChange={(e) => updateElement({ links: e.target.value.split(",").map((item) => item.trim().toLowerCase()).filter(Boolean) })} /></label>{(element.links || ["instagram", "twitter", "linkedin"]).map((platform) => <label key={platform}>{platform} URL<input value={element.urls?.[platform] || ""} placeholder="https://…" onChange={(e) => updateElement({ urls: { ...(element.urls || {}), [platform]: e.target.value } })} /></label>)}<label style={{ display: "flex", textTransform: "none" }}><input type="checkbox" checked={Boolean(element.openInNewTab)} onChange={(e) => updateElement({ openInNewTab: e.target.checked })} /> Open in new tab</label></>}
          {element.type === "carousel" && <><label>Image URLs (one per line)<textarea value={(element.images || []).join("\n")} placeholder="https://…" onChange={(e) => updateElement({ images: e.target.value.split("\n").map((url) => url.trim()).filter(Boolean) })} /></label><label style={{ display: "flex", textTransform: "none" }}><input type="checkbox" checked={element.autoplay !== false} onChange={(e) => updateElement({ autoplay: e.target.checked })} /> Autoplay</label><label>Transition / autoplay speed: {element.transitionSpeed || 4}s<input type="range" min="1" max="12" value={element.transitionSpeed || 4} onChange={(e) => updateElement({ transitionSpeed: Number(e.target.value) })} /></label><label style={{ display: "flex", textTransform: "none" }}><input type="checkbox" checked={element.showDots !== false} onChange={(e) => updateElement({ showDots: e.target.checked })} /> Show dots</label><label style={{ display: "flex", textTransform: "none" }}><input type="checkbox" checked={element.showArrows !== false} onChange={(e) => updateElement({ showArrows: e.target.checked })} /> Show arrows</label></>}
        </>
      ) : (
        <><label>Element animation<select value={element.animation || "none"} onChange={(e) => updateElement({ animation: e.target.value })}><option value="none">None</option><option value="scroll-fade">Fade in</option><option value="scroll-up">Slide up</option><option value="scroll-left">Slide from left</option><option value="scroll-right">Slide from right</option><option value="scroll-zoom">Zoom in</option><option value="scroll-bounce">Bounce in</option><option value="flip">Flip in</option><option value="rotate-in">Rotate in</option><option value="typewriter">Typewriter</option><option value="stagger-children">Stagger children</option></select></label><StylePanel element={element} onChange={(style) => updateElement({ style })} /></>
      )}
    </>
  ) : (
    <>
      {tab === "content" ? (
        <p>
          Select an item on the canvas to edit it, or use the Design tab to
          style this whole section.
        </p>
      ) : (
        <>
          <BackgroundControls section={section} onChange={updateSection} />
          <label>
            Animation
            <select
              value={section.animation}
              onChange={(e) => updateSection({ animation: e.target.value })}
            >
              <option value="none">None</option>
              <optgroup label="Scroll entrance">
                <option value="scroll-fade">Fade in</option>
                <option value="scroll-up">Slide up</option>
                <option value="scroll-left">Slide from left</option>
                <option value="scroll-right">Slide from right</option>
                <option value="scroll-zoom">Zoom in</option>
                <option value="scroll-bounce">Bounce in</option>
              </optgroup>
              <optgroup label="Background motion">
                <option value="aurora">Aurora colour shift</option>
                <option value="fade-in">Colour pulse</option>
                <option value="glow">Glow</option>
                <option value="shimmer">Soft shimmer</option>
                <option value="depth">Depth</option>
              </optgroup>
            </select>
          </label>
          {![
            "none",
            "scroll-fade",
            "scroll-up",
            "scroll-left",
            "scroll-right",
            "scroll-zoom",
            "scroll-bounce",
          ].includes(section.animation) && (
            <>
              <label>
                Motion speed: {section.motionDuration || 8}s
                <input
                  type="range"
                  min="2"
                  max="20"
                  value={section.motionDuration || 8}
                  onChange={(e) =>
                    updateSection({ motionDuration: Number(e.target.value) })
                  }
                />
              </label>
              <label>
                Motion intensity: {section.motionIntensity ?? 55}%
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={section.motionIntensity ?? 55}
                  onChange={(e) =>
                    updateSection({ motionIntensity: Number(e.target.value) })
                  }
                />
              </label>
            </>
          )}
          <label>Size</label>
          <div className="sm-choice">
            {["small", "medium", "large", "full"].map((x) => (
              <button
                key={x}
                className={section.size === x ? "active" : ""}
                onClick={() => updateSection({ size: x })}
              >
                {x}
              </button>
            ))}
          </div>
          <label>
            Section height
            <input
              type="range"
              min="280"
              max="720"
              value={section.height}
              onChange={(e) =>
                updateSection({ height: Number(e.target.value) })
              }
            />
          </label>
        </>
      )}
    </>
  );
  return (
    <aside className="sm-inspector">
      <div className="sm-ins-head">
        <div>
          <b>{element ? element.type : section.type}</b>
          <span>{element ? "Element settings" : "Section settings"}</span>
        </div>
        <IconButton label="Close" onClick={close}>
          <X size={17} />
        </IconButton>
      </div>
      <nav>
        <button
          className={tab === "content" ? "active" : ""}
          onClick={() => setTab("content")}
        >
          Content
        </button>
        <button
          className={tab === "design" ? "active" : ""}
          onClick={() => setTab("design")}
        >
          Design
        </button>
      </nav>
      <div className="sm-fields">{editor}</div>
    </aside>
  );
}

const styles = `@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@500;600;700;800&display=swap');.sm-root{--a:#a78bfa;--bg:#090910;--p:#10101a;--p2:#181824;--l:rgba(255,255,255,.08);--t:#e8e8f0;--m:#9494a6;height:100vh;overflow:hidden;background:var(--bg);color:var(--t);font-family:system-ui,sans-serif}.sm-root *{box-sizing:border-box}.sm-root header{height:56px;display:flex;align-items:center;justify-content:space-between;padding:0 16px;background:rgba(16,16,26,.95);border-bottom:1px solid var(--l)}.sm-title,.sm-bar{display:flex;gap:6px;align-items:center}.sm-title>b{width:27px;height:27px;display:grid;place-items:center;background:linear-gradient(135deg,#a78bfa,#6d28d9);border-radius:8px}.sm-title input{width:150px;background:transparent;border:0;outline:0;color:var(--t);font-family:Syne;font-weight:700}.sm-icon{width:31px;height:31px;border:0;background:transparent;color:var(--m);border-radius:8px;display:grid;place-items:center;cursor:pointer}.sm-icon:hover,.sm-icon.active{background:rgba(167,139,250,.15);color:#ddd6fe}.sm-icon:disabled{opacity:.3}.sm-plain,.sm-export{border:0;border-radius:8px;padding:8px 11px;font-weight:700;display:flex;align-items:center;gap:6px;cursor:pointer}.sm-plain{background:rgba(255,255,255,.08);color:var(--t)}.sm-export{background:var(--a);color:#190c2c}.sm-export:disabled{opacity:.45}.sm-body{height:calc(100vh - 56px);display:flex}.sm-left{width:260px;flex:0 0 260px;background:var(--p);border-right:1px solid var(--l);overflow:auto}.sm-left nav,.sm-inspector nav{display:flex;padding:0 8px;border-bottom:1px solid var(--l)}.sm-left nav button,.sm-inspector nav button{flex:1;padding:13px 4px;border:0;border-bottom:2px solid transparent;background:transparent;color:var(--m);font-weight:700;font-size:.76rem;display:flex;align-items:center;justify-content:center;gap:5px;cursor:pointer}.sm-left nav button.active,.sm-inspector nav button.active{color:#ddd6fe;border-color:var(--a)}.sm-palette{padding:12px;display:grid;grid-template-columns:1fr 1fr;gap:8px}.sm-palette button{border:1px solid var(--l);border-radius:10px;background:var(--p2);color:var(--t);padding:9px;text-align:left;text-transform:capitalize;cursor:pointer;box-shadow:0 5px 16px rgba(0,0,0,.15)}.sm-palette button:hover{border-color:rgba(167,139,250,.5)}.sm-palette span{display:block;margin-top:7px;font-size:.72rem;font-weight:700}.sm-thumbnail{height:42px;padding:5px;display:grid;grid-template-columns:repeat(3,1fr);gap:3px;border-radius:5px;background:#29283c}.sm-thumbnail i{background:rgba(255,255,255,.45);border-radius:2px}.sm-thumbnail.hero i:first-child,.sm-thumbnail.about i:first-child{grid-row:span 2}.sm-thumbnail.video i:first-child,.sm-thumbnail.quote i:first-child{grid-column:span 3}.sm-layer{height:39px;margin:4px 8px;border-radius:8px;display:flex;align-items:center;gap:4px;padding:0 3px;cursor:pointer}.sm-layer:hover,.sm-layer.active{background:rgba(167,139,250,.13)}.sm-layer span{flex:1;font-size:.78rem;text-transform:capitalize}.sm-layer .sm-icon{width:25px;height:25px}.sm-grip{background:transparent;border:0;color:var(--m);cursor:grab}.sm-stage{flex:1;overflow:auto;padding:32px;background:radial-gradient(circle at 50% 0,rgba(167,139,250,.07),transparent 40%),#0c0c14}.sm-site-shell{margin:0 auto;min-height:100%;display:flex;justify-content:center}.sm-site-shell.desktop{max-width:1200px}.sm-site-shell.tablet{max-width:768px}.sm-site-shell.mobile{max-width:375px}.sm-site{background:#f8fafc;min-height:700px;width:100%;overflow:hidden;box-shadow:0 20px 55px rgba(0,0,0,.34)}.sm-site-nav{height:58px;padding:0 32px;display:flex;align-items:center;justify-content:space-between;color:#172033;background:white;font-size:.78rem}.sm-site-nav b{font-family:Syne;font-size:1rem}.sm-canvas-section{position:relative}.sm-section-drag{display:none;position:absolute;left:8px;top:8px;z-index:30;background:#191727;color:#ddd6fe;border-radius:6px;padding:4px;cursor:grab}.sm-canvas-section:hover .sm-section-drag{display:block}.sm-empty{height:480px;background:#fff;display:grid;place-content:center;text-align:center;gap:8px;color:#64748b}.sm-empty strong{font-family:Syne;color:#172033;font-size:1.1rem}.sm-site footer{padding:28px;text-align:center;background:#111827;color:#9ca3af;font-size:.73rem}.sm-inspector{width:300px;flex:0 0 300px;background:var(--p);border-left:1px solid var(--l);overflow:auto;animation:slide .2s ease}.sm-ins-head{display:flex;justify-content:space-between;align-items:center;padding:16px;border-bottom:1px solid var(--l)}.sm-ins-head b{font-family:Syne;text-transform:capitalize;display:block}.sm-ins-head span{font-size:.72rem;color:var(--m)}.sm-fields{padding:16px;display:grid;gap:16px}.sm-fields label{display:grid;gap:6px;color:#b2b2c3;font-size:.7rem;text-transform:uppercase;letter-spacing:.07em;font-weight:700}.sm-fields input,.sm-fields textarea,.sm-fields select{width:100%;border:1px solid var(--l);border-radius:8px;background:#0c0c14;color:var(--t);padding:9px;font:inherit;text-transform:none}.sm-fields p{margin:0;color:var(--m);font-size:.76rem;line-height:1.5;text-transform:none}.sm-choice{display:grid;grid-template-columns:repeat(4,1fr);gap:5px}.sm-choice button{border:1px solid var(--l);border-radius:7px;background:var(--p2);color:var(--m);padding:7px 3px;text-transform:capitalize;font-size:.68rem;cursor:pointer}.sm-choice button.active{border-color:rgba(167,139,250,.5);color:#ddd6fe;background:rgba(167,139,250,.14)}.sm-section-add-elements{position:absolute;right:12px;bottom:12px;z-index:40;display:flex;align-items:center;gap:4px;padding:5px;background:#191727;color:#ddd6fe;border-radius:8px;box-shadow:0 7px 20px rgba(0,0,0,.25);font:500 .68rem 'DM Mono'}.sm-section-add-elements button,.sm-element-toolbar button{width:24px;height:24px;border:0;border-radius:5px;background:transparent;color:#ddd6fe;display:grid;place-items:center;cursor:pointer}.sm-section-add-elements button:hover,.sm-element-toolbar button:hover{background:rgba(255,255,255,.12)}.sm-element{outline:1px solid transparent;min-width:20px;min-height:20px}.sm-element.selected{outline:2px solid #a78bfa}.sm-element-heading{margin:0;color:white;font-family:Syne,sans-serif;font-size:54px;font-weight:800;line-height:1.04;letter-spacing:-.05em;height:100%;outline:0}.sm-element-text{margin:0;color:#d1d5db;font-size:19px;line-height:1.65;height:100%;outline:0}.sm-element-button{display:inline-flex;align-items:center;justify-content:center;min-width:130px;height:46px;padding:0 18px;border-radius:999px;background:white;color:#1e1b4b;font-weight:800;outline:0}.sm-element-image,.sm-image-placeholder{width:100%;height:100%;object-fit:cover;border-radius:14px;display:block}.sm-image-placeholder{display:grid;place-content:center;gap:8px;text-align:center;background:rgba(255,255,255,.12);border:1px dashed rgba(255,255,255,.45);color:#e2e8f0}.sm-element-toolbar{position:absolute;left:0;top:-34px;z-index:100;display:flex;padding:3px;background:#191727;border-radius:7px;box-shadow:0 6px 18px rgba(0,0,0,.35)}.sm-element-toolbar label{display:flex;align-items:center;gap:4px;padding:0 5px;color:#ddd6fe}.sm-element-toolbar input{position:absolute;left:0;top:31px;width:180px;border:0;border-radius:6px;padding:7px;background:#191727;color:white;font-size:11px;opacity:0;pointer-events:none}.sm-element-toolbar label:hover input{opacity:1;pointer-events:auto}.sm-mobile-section{padding:40px 24px;color:#fff;display:grid;gap:16px}.sm-mobile-kicker{font:700 .7rem 'DM Mono';color:#c4b5fd;letter-spacing:.1em}.sm-mobile-element.heading h2{margin:0;font:800 clamp(2rem,10vw,3rem) Syne;letter-spacing:-.05em}.sm-mobile-element.text p{margin:0;color:#d1d5db;line-height:1.7}.sm-mobile-element.image img,.sm-mobile-image{width:100%;height:220px;object-fit:cover;border-radius:12px;background:rgba(255,255,255,.14);display:grid;place-items:center}.sm-mobile-element.button button{border:0;border-radius:999px;padding:12px 18px;font-weight:800}.sm-preview{min-height:100vh;background:#e9edf3;padding:24px}.sm-preview>button{position:fixed;right:12px;top:12px;z-index:100;border:0;border-radius:99px;background:#191727;color:white;padding:9px 13px;font-weight:700}.sm-preview .sm-site-shell{min-height:calc(100vh - 48px)}@keyframes slide{from{opacity:0;transform:translateX(15px)}to{opacity:1;transform:none}}@media(max-width:900px){.sm-left{width:220px;flex-basis:220px}.sm-inspector{position:absolute;z-index:50;right:0;top:56px;bottom:0}.sm-stage{padding:18px}.sm-title input{width:100px}.sm-plain{font-size:0;padding:8px}.sm-plain svg{display:block}}`;
