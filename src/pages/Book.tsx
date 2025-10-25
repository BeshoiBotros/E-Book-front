import type React from "react";
import AuthHeader from "../components/AuthHeader";
import Cookies from "js-cookie";
import { Navigate } from "react-router";
import HTMLFlipBook from "react-pageflip";
import { Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../api/main";
import { getTokenFromCookies } from "../api/auth";
import '../styles/book.css'

// --- STYLES (Unchanged) ---
const styles = {
  background: {
    backgroundColor: "#1C1A17",
    minHeight: "100vh",
    padding: "1rem 0",
    overflow: "hidden",
  },
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    padding: "0 0.5rem",
    overflow: "hidden",
  },
  bookWrapper: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    gap: "2rem",
    width: "100%",
    maxWidth: "1200px",
  },
  flipBook: {

    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    borderRadius: "8px",
  },
  page: {
    backgroundColor: "#F8F5F1",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" as "relative",
  },
  pageContent: {
    width: "100%",
    height: "100%",
    position: "relative" as "relative",
  },
  pageImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as "cover",
  },
  pageNumber: {
    position: "absolute" as "absolute",
    bottom: "10px",
    right: "15px",
    backgroundColor: "rgba(184, 138, 68, 0.8)",
    color: "#F8F5F1",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold" as "bold",
  },
  progressContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    alignItems: "center",
    gap: "0.5rem",
    width: "100%",
    maxWidth: "400px",
    padding: "0 1rem",
  },
  progressBar: {
    width: "100%",
    height: "6px",
    backgroundColor: "#2E1E0F",
    borderRadius: "3px",
    overflow: "hidden" as "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#B88A44",
    transition: "width 0.3s ease",
  },
  progressText: {
    color: "#B7AFA5",
    fontSize: "14px",
    fontWeight: "500" as "500",
    textAlign: "center" as "center",
  },
  loadingOverlay: {
    position: "fixed" as "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
    backgroundColor: "rgba(28, 26, 23, 0.98)", // Darker overlay
  },
  loadingContent: {
    display: "flex",
    flexDirection: 'column' as 'column', // Stack vertically
    alignItems: "center",
    gap: "1.5rem",
    padding: "2rem 2.5rem",
    borderRadius: "12px",
    backgroundColor: "rgba(44, 40, 35, 0.95)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    border: "1px solid #B88A44",
  },
  spinner: {
    color: "#B88A44",
    width: '3rem',
    height: '3rem',
  },
  loadingText: {
    color: "#F8F5F1",
    fontSize: "18px",
    fontWeight: "500" as "500",
  },
  pageJumpContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1.5rem",
    padding: "0.75rem 1.25rem",
    backgroundColor: "rgba(184, 138, 68, 0.1)",
    borderRadius: "12px",
    border: "1px solid rgba(184, 138, 68, 0.3)",
  },
  pageJumpLabel: {
    color: "#B7AFA5",
    fontSize: "14px",
    fontWeight: "500" as "500",
    whiteSpace: "nowrap" as "nowrap",
  },
  pageJumpInput: {
    width: "80px",
    padding: "0.5rem 0.75rem",
    backgroundColor: "#2E1E0F",
    border: "1px solid #B88A44",
    borderRadius: "8px",
    color: "#F8F5F1",
    fontSize: "14px",
    fontWeight: "500" as "500",
    textAlign: "center" as "center",
    outline: "none",
  },
  pageJumpButton: {
    padding: "0.5rem 1.25rem",
    backgroundColor: "#B88A44",
    border: "none",
    borderRadius: "8px",
    color: "#F8F5F1",
    fontSize: "14px",
    fontWeight: "600" as "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap" as "nowrap",
  },
};
const customStyles = `
  .custom-flip-book .page { background-color: #F8F5F1; }
  .custom-flip-book .page.-active { box-shadow: 0 0 20px rgba(184, 138, 68, 0.2); }
  .page-flip .page .page-content { background-color: #F8F5F1 !important; }
  @media (max-width: 768px) { .custom-flip-book { max-width: 90vw !important; } }
  @media (max-width: 480px) { .custom-flip-book { max-width: 95vw !important; } }
`;
// --- END OF STYLES ---

const PAGES_PER_FETCH = 10; // Fetch in chunks for efficiency

const Book: React.FC = () => {
  if (!Cookies.get("access")) return <Navigate to="/login" />;

  const [dimensions, setDimensions] = useState({ width: 400, height: 550 });
  const [isMobile, setIsMobile] = useState(false);
  const [pageInput, setPageInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isPreloading, setIsPreloading] = useState(true); // State for the initial full load
  const bookRef = useRef<any>(null);

  // --- Responsive Dimensions Effect (Unchanged) ---
  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      let width = 400, height = 550, mobile = false;
      if (screenWidth <= 1024 && screenWidth > 768) { width = 350; height = 480; }
      else if (screenWidth <= 768 && screenWidth > 480) { width = Math.min(320, screenWidth * 0.85); height = width * 1.375; mobile = true; }
      else if (screenWidth <= 480) { width = Math.min(280, screenWidth * 0.85); height = width * 1.375; mobile = true; }
      const maxHeight = screenHeight * 0.65;
      if (height > maxHeight) { height = maxHeight; width = height / 1.375; }
      setDimensions({ width: Math.round(width), height: Math.round(height) });
      setIsMobile(mobile);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // --- Data Fetching Logic ---
  const fetchPages = async ({ pageParam = 1 }) => {
    const res = await axios.get(`${BASE_API_URL}/book/page/`, {
      params: { start: pageParam, end: pageParam + PAGES_PER_FETCH - 1 },
      headers: {
        'Authorization': `Bearer ${getTokenFromCookies()}`
      }
    });
    return res.data;
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["book-cache"],
      queryFn: fetchPages,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const loadedCount = allPages.flatMap((p) => p.pages).length;
        return loadedCount < lastPage.total_pages ? loadedCount + 1 : undefined;
      },
      staleTime: Infinity, 
    });

  const pages = data?.pages ? data.pages.flatMap((group) => group.pages) : [];
  const totalPages = data?.pages?.[0]?.total_pages ?? 0;

  // --- Preloading Effect ---
  useEffect(() => {
    if (!totalPages) return;

    if (pages.length >= totalPages) {
      if (isPreloading) {
        console.log("✅ All pages successfully loaded.");
        setIsPreloading(false);
        
        // --- NEW: Force book to the first page after loading ---
        console.log("Resetting to the first page.");
        setCurrentPage(0);
        bookRef.current?.pageFlip()?.turnToPage(0);
        // --------------------------------------------------------
      }
      return;
    }

    if (hasNextPage && !isFetchingNextPage) {
      console.log(`Loading pages... (${pages.length}/${totalPages})`);
      fetchNextPage();
    }
  }, [pages.length, totalPages, hasNextPage, isFetchingNextPage, fetchNextPage, isPreloading]);

  // --- Event Handlers ---
  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const handlePageJump = () => {
    const pageNumber = parseInt(pageInput);
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
      alert(`Please enter a valid page number between 1 and ${totalPages}.`);
      return;
    }
    const targetPage = pageNumber - 1;
    bookRef.current?.pageFlip()?.turnToPage(targetPage);
    setCurrentPage(targetPage);
    setPageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handlePageJump();
  };

  

  return (
    <>
      <style>{customStyles}</style>
      <AuthHeader />

      {/* --- Main Preloader Overlay --- */}
      {isPreloading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <Spinner animation="border" style={styles.spinner} />
            <span style={styles.loadingText}>
              جار تحضير كتابك... {pages.length} / {totalPages || "..."}
            </span>
          </div>
        </div>
      )}

      {/* --- Book Container (hidden until preloading is complete) --- */}
      <div style={{...styles.background, visibility: isPreloading ? 'hidden' : 'visible', marginTop: '50px' }}>
        <Row>
          <Container style={styles.container}>
            <div style={styles.bookWrapper}>
              
              {/* Page Jump Input */}
              <div style={styles.pageJumpContainer}>
                <span style={styles.pageJumpLabel}>اذهب إلى صفحة:</span>
                <input
                  type="number"
                  min="1"
                  max={totalPages || 1}
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`1-${totalPages || '...'}`}
                  style={styles.pageJumpInput}
                />
                <button
                  onClick={handlePageJump}
                  style={styles.pageJumpButton}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#D4A053"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(184, 138, 68, 0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#B88A44"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  اذهب
                </button>
              </div>

              {/* Flipbook Component */}
              <HTMLFlipBook
                ref={bookRef}
                style={styles.flipBook}
                width={dimensions.width}
                height={dimensions.height}
                startPage={currentPage}
                maxWidth={dimensions.width}
                // direction="rtl"
                size="stretch"
                className="custom-flip-book rtl-book"
                onFlip={handleFlip}
                drawShadow={true}
                showCover={!isMobile}
                minWidth={150}
                minHeight={206}
                maxHeight={700}
                flippingTime={800}
                usePortrait={isMobile}
                startZIndex={0}
                autoSize={true}
                maxShadowOpacity={0.8}
                mobileScrollSupport={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                {pages.map((src, i) => (
                  <div key={i} className="page" style={styles.page}>
                    <div style={styles.pageContent}>
                      <img src={src} alt={`page ${i + 1}`} style={styles.pageImage} loading="lazy" />
                      <div style={styles.pageNumber}>{i + 1}</div>
                    </div>
                  </div>
                ))}
              </HTMLFlipBook>

              {/* Reading Progress Indicator */}
              <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width: `${((currentPage + 1) / totalPages) * 100}%`,
                    }}
                  />
                </div>
                <span style={styles.progressText}>
                  صفحة {currentPage + 1} من {totalPages}
                </span>
              </div>
            </div>
          </Container>
        </Row>
      </div>
    </>
  );
};

export default Book;