import React from 'react';

const InfoRow = ({ label, value, highlight }) => (
  <div className="debug-row">
    <span className="debug-label">{label}</span>
    <span className={`debug-value ${highlight ? 'debug-highlight' : ''}`}>{value}</span>
  </div>
);

const DebugPanel = ({ metadata, sources, conversationId, isOpen, onToggle }) => {
  return (
    <>
      {/* Toggle button (visible when panel is closed) */}
      <button
        className={`debug-toggle-btn ${isOpen ? 'debug-toggle-hidden' : ''}`}
        onClick={onToggle}
        title="Open Log View"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Panel */}
      <div className={`debug-panel ${isOpen ? 'debug-panel-open' : ''}`}>
        <div className="debug-header">
          <h3 className="debug-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Log View
          </h3>
          <button className="debug-close-btn" onClick={onToggle} title="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {!metadata ? (
          <div className="debug-empty">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" opacity="0.3">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
              <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" />
            </svg>
            <p>Send a message to see routing & token data here.</p>
          </div>
        ) : (
          <div className="debug-content">
            {/* Router section */}
            <div className="debug-section">
              <div className="debug-section-label">Router</div>
              <InfoRow
                label="Classification"
                value={
                  <span className={`debug-badge ${metadata.classification === 'complex' ? 'badge-complex' : 'badge-simple'}`}>
                    {metadata.classification}
                  </span>
                }
              />
              <InfoRow label="Model" value={metadata.model_used} highlight />
            </div>

            {/* Tokens section */}
            <div className="debug-section">
              <div className="debug-section-label">Tokens</div>
              <div className="debug-token-grid">
                <div className="debug-token-card">
                  <span className="debug-token-number">{metadata.tokens?.input?.toLocaleString()}</span>
                  <span className="debug-token-label">Input</span>
                </div>
                <div className="debug-token-card">
                  <span className="debug-token-number">{metadata.tokens?.output?.toLocaleString()}</span>
                  <span className="debug-token-label">Output</span>
                </div>
              </div>
            </div>

            {/* Performance section */}
            <div className="debug-section">
              <div className="debug-section-label">Performance</div>
              <InfoRow
                label="Latency"
                value={`${metadata.latency_ms} ms`}
              />
              <InfoRow
                label="Chunks Retrieved"
                value={metadata.chunks_retrieved}
              />
            </div>

            {/* Sources section */}
            {sources && sources.length > 0 && (
              <div className="debug-section">
                <div className="debug-section-label">Sources</div>
                <div className="debug-sources-list">
                  {sources.map((src, i) => (
                    <div key={i} className="debug-source-item">
                      <span className="debug-source-name">📄 {src.document}</span>
                      <div className="debug-source-meta">
                        <span>p.{src.page}</span>
                        <span className="debug-source-score">
                          {(src.relevance_score * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Evaluator flags */}
            {metadata.evaluator_flags && metadata.evaluator_flags.length > 0 && (
              <div className="debug-section">
                <div className="debug-section-label">Evaluator Flags</div>
                <div className="debug-flags">
                  {metadata.evaluator_flags.map((flag, i) => (
                    <span key={i} className="debug-flag-chip">⚠️ {flag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Conversation ID */}
            {conversationId && (
              <div className="debug-section debug-section-muted">
                <InfoRow label="Conversation" value={conversationId} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default DebugPanel;
