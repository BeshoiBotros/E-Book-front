// ...existing code...
import type React from "react";
import HTMLFlipBook from "react-pageflip";
import { Container, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { BASE_API_URL } from "../api/main";
import { getTokenFromCookies } from "../api/auth";
import "../styles/book.css";
import HeaderBootstrap from "../components/HeaderBootstrap";

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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
    backgroundColor: "rgba(28, 26, 23, 0.98)",
  },
  loadingContent: {
    display: "flex",
    flexDirection: "column" as "column",
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
    width: "3rem",
    height: "3rem",
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
  loadingIndicator: {
    position: "absolute" as "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    padding: "0.5rem 1rem",
    backgroundColor: "rgba(184, 138, 68, 0.9)",
    borderRadius: "8px",
    color: "#F8F5F1",
    fontSize: "14px",
    fontWeight: "500" as "500",
    zIndex: 1000,
  },
};

const customStyles = `
  .custom-flip-book .page { background-color: #F8F5F1; }
  .custom-flip-book .page.-active { box-shadow: 0 0 20px rgba(184, 138, 68, 0.2); }
  .page-flip .page .page-content { background-color: #F8F5F1 !important; }
  @media (max-width: 768px) { .custom-flip-book { max-width: 90vw !important; } }
  @media (max-width: 480px) { .custom-flip-book { max-width: 95vw !important; } }
`;

const Book: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 400, height: 550 });
  const [isMobile, setIsMobile] = useState(false);
  const [pageInput, setPageInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const bookRef = useRef<any>(null);

  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      let width = 400,
        height = 550,
        mobile = false;
      if (screenWidth <= 1024 && screenWidth > 768) {
        width = 350;
        height = 480;
      } else if (screenWidth <= 768 && screenWidth > 480) {
        width = Math.min(320, screenWidth * 0.85);
        height = width * 1.375;
        mobile = true;
      } else if (screenWidth <= 480) {
        width = Math.min(280, screenWidth * 0.85);
        height = width * 1.375;
        mobile = true;
      }
      const maxHeight = screenHeight * 0.65;
      if (height > maxHeight) {
        height = maxHeight;
        width = height / 1.375;
      }
      setDimensions({ width: Math.round(width), height: Math.round(height) });
      setIsMobile(mobile);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const fetchPages = async ({ pageParam = 1 }) => {
    const token = getTokenFromCookies();

    // Build headers conditionally based on token availability
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const res = await axios.get(`${BASE_API_URL}/book/page/`, {
      params: { page: pageParam },
      headers,
      withCredentials: true,  // Add this
    });

    const responseData = res.data;

    return {
      pages: responseData.results?.pages || [],
      totalPages: responseData.results?.total_pages || responseData.count || 0,
      nextPage: responseData.next,
      isAuthorized: responseData.results?.authorized || false,
    };
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["book-pages"],
    queryFn: fetchPages,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // If there's a next URL, increment page number
      if (lastPage.nextPage) {
        return allPages.length + 1;
      }
      return undefined;
    },
    staleTime: Infinity,
    gcTime: Infinity, // Keep cached data indefinitely
  });

  // Flatten all pages from all fetched chunks
  const allPages = data?.pages?.flatMap((page) => page.pages) || [];
  const totalPages = data?.pages?.[0]?.totalPages || 0;
  const isAuthorized = data?.pages?.[0]?.isAuthorized || false;

  // Hide initial loading overlay once first data is loaded
  useEffect(() => {
    if (!isLoading && allPages.length > 0 && isInitialLoading) {
      setIsInitialLoading(false);
    }
  }, [isLoading, allPages.length, isInitialLoading]);

  // Auto-fetch next page when user approaches the end
  const handleFlip = (e: any) => {
    const newPage = e?.data ?? 0;
    setCurrentPage(newPage);

    // Trigger next page fetch when user is near the end of loaded pages
    const loadedPagesCount = allPages.length;
    const threshold = Math.max(3, Math.floor(loadedPagesCount * 0.1)); // Load when 90% through or 3 pages from end

    if (
      newPage >= loadedPagesCount - threshold &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  const handlePageJump = () => {
    const pageNumber = parseInt(pageInput, 10);
    if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
      alert(`الرجاء إدخال رقم صفحة صحيح بين 1 و ${totalPages}.`);
      return;
    }
    const targetPage = pageNumber - 1;

    // Check if we need to load more pages to reach the target
    if (targetPage >= allPages.length && hasNextPage && !isFetchingNextPage) {
      // Load more pages then jump
      fetchNextPage().then(() => {
        setTimeout(() => {
          bookRef.current?.pageFlip()?.turnToPage(targetPage);
          setCurrentPage(targetPage);
        }, 100);
      });
    } else {
      bookRef.current?.pageFlip()?.turnToPage(targetPage);
      setCurrentPage(targetPage);
    }

    setPageInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handlePageJump();
  };

  return (
    <>
      <style>{customStyles}</style>
      <HeaderBootstrap />

      {isInitialLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <Spinner animation="border" style={styles.spinner} />
            <span style={styles.loadingText}>
              جار تحضير كتابك...
            </span>
          </div>
        </div>
      )}

      {/* --- Book Container --- */}
      <div
        style={{
          ...styles.background,
          visibility: isInitialLoading ? "hidden" : "visible",
          marginTop: "50px",
        }}
      >
        <Row>
          <Container style={styles.container}>
            <div style={styles.bookWrapper}>
              {!isAuthorized && totalPages > allPages.length && (
                <div
                  style={{
                    padding: "0.75rem 1.25rem",
                    backgroundColor: "rgba(184, 138, 68, 0.15)",
                    borderRadius: "8px",
                    border: "1px solid rgba(184, 138, 68, 0.4)",
                    color: "#B7AFA5",
                    fontSize: "14px",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                >
                  أنت تشاهد النسخة المجانية. قم بتسجيل الدخول للوصول إلى الكتاب الكامل.
                </div>
              )}

              <div style={styles.pageJumpContainer}>
                <span style={styles.pageJumpLabel}>اذهب إلى صفحة:</span>
                <input
                  type="number"
                  min={1}
                  max={totalPages || 1}
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`1-${totalPages || "..."}`}
                  style={styles.pageJumpInput}
                />
                <button
                  onClick={handlePageJump}
                  style={styles.pageJumpButton}
                  onMouseEnter={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.backgroundColor = "#D4A053";
                    btn.style.transform = "translateY(-2px)";
                    btn.style.boxShadow = "0 4px 12px rgba(184, 138, 68, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    const btn = e.currentTarget as HTMLButtonElement;
                    btn.style.backgroundColor = "#B88A44";
                    btn.style.transform = "translateY(0)";
                    btn.style.boxShadow = "none";
                  }}
                >
                  اذهب
                </button>
              </div>

              <div style={{ position: "relative" }}>
                <HTMLFlipBook
                  ref={bookRef}
                  style={styles.flipBook}
                  width={dimensions.width}
                  height={dimensions.height}
                  startPage={currentPage}
                  maxWidth={dimensions.width}
                  size="stretch"
                  className="custom-flip-book rtl-book"
                  onFlip={handleFlip}
                  drawShadow={true}
                  showCover={!isMobile}
                  minWidth={400}
                  minHeight={600}
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
                  {allPages.map((src, i) => (
                    <div key={i} className="page">
                      <div
                        style={{
                          ...styles.pageContent,
                          direction: "rtl",
                          textAlign: "right",
                        }}
                      >
                        <img
                          src={src}
                          alt={`page ${i + 1}`}
                          style={styles.pageImage}
                          loading="lazy"
                        />
                        <div style={styles.pageNumber}>{i + 1}</div>
                      </div>
                    </div>
                  ))}
                </HTMLFlipBook>

                {isFetchingNextPage && (
                  <div style={styles.loadingIndicator}>
                    جار تحميل المزيد من الصفحات...
                  </div>
                )}
              </div>

              <div style={styles.progressContainer}>
                <div style={styles.progressBar}>
                  <div
                    style={{
                      ...styles.progressFill,
                      width:
                        totalPages > 0
                          ? `${((currentPage + 1) / totalPages) * 100}%`
                          : "0%",
                    }}
                  />
                </div>
                <span style={styles.progressText}>
                  صفحة {currentPage + 1} من {totalPages || "..."}
                  {allPages.length < totalPages && ` (محملة: ${allPages.length})`}
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
// ...existing code...