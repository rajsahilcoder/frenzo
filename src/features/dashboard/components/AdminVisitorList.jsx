import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyticsService } from '../../analytics/analyticsService';

const AdminVisitorList = ({ onSelectVisitor }) => {
    const navigate = useNavigate();
    const [visitors, setVisitors] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Pagination State
    const [page, setPage] = useState(1);
    const [lastDocs, setLastDocs] = useState([]); // Stack of cursors for "Back" button
    const [hasMore, setHasMore] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // We need to store the 'nextPageCursor' returned by the service.
    const [nextPageCursor, setNextPageCursor] = useState(null);

    const fetchPage = async (cursor) => {
        setLoading(true);
        setErrorMsg('');
        try {
            const { visitors: raw, lastDoc, hasMore: more } = await analyticsService.getAllVisitors(cursor, 10);
            const enriched = await analyticsService.enrichWithUserData(raw);
            
            setVisitors(enriched);
            setNextPageCursor(lastDoc);
            setHasMore(more);
        } catch (e) {
            console.error(e);
            setErrorMsg('Failed to load visitors.');
        } finally {
            setLoading(false);
        }
    };

    // Next Page
    const doNext = () => {
        if (!nextPageCursor) return;
        setLastDocs([...lastDocs, nextPageCursor]); // Save cursor used for NEXT page (to go back to it? No, saving cursor for CURRENT page is tricky)
        // Simplified Stack Strategy: 
        // 'lastDocs' stores the cursor that STARTS the page we are leaving.
        // Page 1: Cursor=null. 
        // Click Next -> Stack=[null]. Fetch(nextPageCursor).
        // Page 2: Cursor=nextPageCursor.
        // Click Next -> Stack=[null, nextPageCursor]. Fetch(newNext).
        
        // Wait, 'lastDocs' is history of *START CURSORS*.
        // Page 1 start cursor is NULL.
        // But we don't have access to "current page start cursor" easily unless we store it.
        // Let's assume the previous fetch used 'lastDocs[lastDocs.length-1]' ? No.
        
        // Let's just store the cursor that *produced* the current page? No.
        
        // FIX: Stack stores the *Last Document* of the *Previous Page*.
        // Page 1: Stack []. Fetch(null).
        // Finish Page 1. We have 'nextPageCursor' (Last doc of Page 1).
        // Click Next: Stack [nextPageCursor]. Fetch(nextPageCursor).
        // Finish Page 2. We have 'nextPageCursor2' (Last doc of Page 2).
        // Click Next: Stack [nextPageCursor, nextPageCursor2]. Fetch(nextPageCursor2).
        
        // Click Prev: Pop Stack. New Top is 'nextPageCursor'. NO.
        // Page 3 (Stack: [C1, C2]). Prev should load Page 2 using C1.
        // So we Pop C2. Top is C1. Use C1.
        // Page 2 (Stack: [C1]). Prev should load Page 1 using null.
        // So we Pop C1. Stack empty. Use null.
        
        // Correct Logic:
        // DO NEXT: Push 'nextPageCursor' (which is the cursor for the new page we are about to load) to stack? 
        // No, 'nextPageCursor' is the START point of the NEXT page.
        // So yes, push it.
        
        // But wait.
        // Request 1: fetch(null) -> returns lastDoc=A.
        // Next: fetch(A). Stack should store... A? 
        // If I am on Page 2 (fetched with A), and I hit Prev, I want to fetch(null).
        
        // So Stack should store the cursor used to fetch the *pages in history*.
        // Page 1 loaded with null. Stack: [null].
        // Next: Load Page 2 with A. Stack: [null, A].
        // Prev: Pop A. Top is null. Load with null. Stack: [null].
        
        // Implementation:
        const currentFetchCursor = lastDocs.length > 0 ? lastDocs[lastDocs.length - 1] : null; 
        // This 'currentFetchCursor' is what we used for THIS page.
        // But we didn't save it yet?
        // Let's just save the *cursor needed for the NEXT page* into the stack? No.
        
        // Let's keep it simple:
        // 'lastDocs' = Stack of cursors for *previous* pages.
        // Page 1: Stack []. Current Page Cursor = null.
        // Click Next: Push 'null' (current page cursor) to stack? NO.
        // We need to return to Page 1. We need 'null'.
        // So yes, push 'null' to stack? Then subsequent pushes are actual cursors.
        
        // Actually, easiest way: 
        // Stack contains [startCursorOfPage1, startCursorOfPage2...].
        // Page 1 load: Fetch(null). Stack [null].
        // Next: Fetch(lastDocOfPage1). Stack [null, lastDocOfPage1].
        // Prev: Pop. Stack [null]. Fetch(stack.top).
        
        // Logic:
        // 1. We track `currentStartCursor` separately? Or derive from stack?
        // Let's use `lastDocs` as the history of start cursors.
        
        const nextCursor = nextPageCursor;
        const currentStartCursor =  lastDocs.length > 0 ? lastDocs[lastDocs.length - 1] : null;
        
        setLastDocs([...lastDocs, nextCursor]); // This logic is wrong.
        
        // RESTART LOGIC: 
        // We only push to stack when leaving a page.
        // When on Page 1 (Start=null), moving to Page 2 (Start=A).
        // We need to remember "Page 1 started with null".
        // So push `null`. Stack: `[null]`.
        // Now on Page 2. Moving to Page 3 (Start=B).
        // Remember "Page 2 started with A".
        // Push `A`. Stack: `[null, A]`.
        
        // DO NEXT:
        // We need the *start cursor* of the *current page*. 
        // Where is it? We can track it in state `currentStartCursor`.
        // But for Page 1 it's init to null.
    };

    // Let's restart the function implementation cleanly
    const [history, setHistory] = useState([]); // Array of start-cursors for previous pages
    // Note: Page 1 start-cursor is NULL. Page 2 is docRef...

    const doNextClean = () => {
        if (!nextPageCursor) return;
        
        // 1. Identify what was the start cursor for THIS page.
        // It's tricky to know unless stored. 
        // Hack: `history` stores start cursors of *completed previous pages*.
        // So for Page 1, history is [], current start is null.
        // Moving to Page 2: Push `null` to history. history = [null].
        // current start becomes `nextPageCursor`.
        
        // PROBLEM: `history` doesn't help us fetch the next page, `nextPageCursor` does.
        // `history` helps us go BACK.
        
        // When moving Next:
        // We are currently viewing page generated by `history[len-1]` (if len>0) else `null`.
        // We want to save *that* cursor to history so we can come back.
        const currentStart = history.length > 0 ? history[history.length - 1] : null; 
        
        // Wait, if history represents *previous* pages, then for Page 1 (no previous), history is empty.
        // START Page 1: history=[]. Fetch(null).
        // NEXT: Push `null` (start of Pg1) to history? history=[null]. Fetch(A).
        // NOW on Page 2. 
        // NEXT: Push `A` (start of Pg2) to history? history=[null, A]. Fetch(B).
        // NOW on Page 3.
        
        // PREV: Pop. history=[null]. Fetch(A). Correct (Page 2).
        // PREV: Pop. history=[]. Fetch(null). Correct (Page 1).
        
        // IMPLEMENTATION:
        // We need to know "Start cursor of Current Page". 
        // Let's add state `currentStart` initialized to null.
        setHistory([...history, currentStart]);
        setCurrentStart(nextPageCursor);
        setPage(p => p + 1);
        fetchPage(nextPageCursor);
    };
    
    // BUT adding more state is messy. 
    // Alternate: `history` stack always includes current page start? No that's complex.
    
    // SIMPLEST IMPLEMENTATION that works: 
    // `lastDocs` stack stores the snapshot used to START the previous pages.
    // For Page 1 (start=null), we don't push null to stack. We handle Page 1 explicitly.
    // Page 1 -> Next: Push `nextPageCursor` to `lastDocs`. `lastDocs` = [docA] (Cursor for Page 2).
    // Page 2 -> Next: Push `docB`. `lastDocs` = [docA, docB].
    // Page 2 -> Prev: Pop `docB`? NO.
    
    // I will use `history` as "Start Cursors of ALL pages visited".
    // Page 1: history = [null]. Load history[0].
    // Next: history = [null, docA]. Load history[1].
    // Page 2: history = [null, docA].
    // Prev: history = [null]. Load history[0].
    
    // This is robust.
    const [pageConfig, setPageConfig] = useState({
        history: [null], // Stack of start cursors. Top is current page.
        currentPageIndex: 0
    });

    const loadPage = async (cursor) => {
        setLoading(true);
        setErrorMsg('');
        try {
            const { visitors: raw, lastDoc, hasMore: more } = await analyticsService.getAllVisitors(cursor, 10);
            const enriched = await analyticsService.enrichWithUserData(raw);
            
            setVisitors(enriched);
            setNextPageCursor(lastDoc); // Candidate for next page
            setHasMore(more);
        } catch (e) {
            console.error(e);
            setErrorMsg('Failed to load.');
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        // Initial load
        loadPage(null);
    }, []);

    const goToNext = () => {
        if (!hasMore || !nextPageCursor) return;
        
        const newHistory = [...pageConfig.history, nextPageCursor];
        const newIndex = pageConfig.currentPageIndex + 1;
        
        setPageConfig({ history: newHistory, currentPageIndex: newIndex });
        setPage(p => p + 1);
        loadPage(nextPageCursor);
    };

    const goToPrev = () => {
        if (pageConfig.currentPageIndex === 0) return;
        
        const newHistory = pageConfig.history.slice(0, -1); // Remove top
        const newIndex = pageConfig.currentPageIndex - 1;
        const prevCursor = newHistory[newIndex];
        
        setPageConfig({ history: newHistory, currentPageIndex: newIndex });
        setPage(p => p - 1);
        loadPage(prevCursor);
    };

    // ... Render ...


    const timeAgo = (timestamp) => {
        if (!timestamp) return 'Never';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const diff = (new Date() - date) / 1000;
        
        if (diff < 60) return 'Just now';
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    if (loading && visitors.length === 0) return <div style={{padding:'2rem'}}>Loading visitors...</div>;
    
    // Show simple error if blocked
    if (errorMsg) {
        return (
            <div style={{padding:'2rem', color:'red'}}>
                <h3>Error Loading Analytics</h3>
                <p>{errorMsg}</p>
                <button onClick={() => loadPage(null)} style={{marginTop:'1rem', padding:'0.5rem 1rem'}}>Retry</button>
            </div>
        );
    }

    return (
        <div className="analytics-list-container">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem'}}>
                <h3>Visitor Insights</h3>
                <span className="badge" style={{background:'var(--bg-secondary)', padding:'0.2rem 0.5rem', borderRadius:'4px', fontSize:'0.8rem'}}>
                    Page {page}
                </span>
            </div>
            
            <div style={{ overflowX: 'auto', minHeight: '200px' }}>
                <table className="analytics-table">
                    <thead>
                        <tr>
                            <th>User / Device</th>
                            <th>Total Visits</th>
                            <th>Last Active</th>
                            <th>First Seen</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {visitors.map((v) => (
                            <tr key={v.deviceId} 
                                onClick={() => {
                                    if (v.userId) {
                                        navigate(`/profile/${v.userId}`);
                                    } else {
                                        onSelectVisitor(v); // Keep existing behavior for Guests (Detail View)
                                    }
                                }} 
                                style={{ cursor: 'pointer' }}
                            >
                                <td>
                                    {v.userData ? (
                                        <div style={{display:'flex', flexDirection:'column'}}>
                                            <span style={{fontWeight:'600', color:'var(--text-primary)'}}>
                                                {v.userData.displayName || 'Unnamed User'}
                                            </span>
                                            <span style={{fontSize:'0.8rem', color:'var(--text-tertiary)'}}>
                                                {v.userData.email}
                                            </span>
                                        </div>
                                    ) : (
                                        <span style={{fontFamily:'monospace', color:'var(--text-secondary)'}}>
                                            Guest ({v.deviceId.substring(0, 8)}...)
                                        </span>
                                    )}
                                </td>
                                <td>{v.visitCount}</td>
                                <td style={{ color: 'var(--accent-primary)' }}>{timeAgo(v.lastSeen)}</td>
                                <td>{timeAgo(v.firstSeen)}</td>
                                <td>
                                    <button 
                                        style={{ 
                                            background: 'var(--bg-tertiary)', border:'1px solid var(--border-light)', 
                                            color:'var(--text-primary)', padding:'0.4rem 0.8rem', borderRadius:'4px', cursor:'pointer'
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (v.userId) {
                                                navigate(`/profile/${v.userId}`);
                                            } else {
                                                onSelectVisitor(v);
                                            }
                                        }}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {visitors.length === 0 && !loading && (
                           <tr>
                               <td colSpan="5" style={{textAlign:'center', padding:'2rem'}}>
                                   <p>No visitors found.</p>
                               </td>
                           </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            {/* Pagination Controls */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button 
                    onClick={goToPrev} 
                    disabled={page === 1 || loading}
                    className="log-btn"
                    style={{ width: 'auto', padding: '0.5rem 1rem', background: page === 1 ? 'var(--bg-secondary)' : 'var(--accent-primary)' }}
                >
                    Previous
                </button>
                <button 
                    onClick={goToNext} 
                    disabled={!hasMore || loading}
                    className="log-btn"
                    style={{ width: 'auto', padding: '0.5rem 1rem', background: !hasMore ? 'var(--bg-secondary)' : 'var(--accent-primary)' }}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminVisitorList;
