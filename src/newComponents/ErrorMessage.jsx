const ErrorMessage = ({
                          error,
                          onRetry,
                          message = "오류가 발생했습니다."
                      }) => {
    return (
        <div className="text-center py-5">
            <div className="alert alert-danger" role="alert">
                <h5>⚠️ {message}</h5>
                {error && (
                    <p className="mb-0 small">{error.message}</p>
                )}
                {onRetry && (
                    <button
                        className="btn btn-outline-danger btn-sm mt-2"
                        onClick={onRetry}
                    >
                        다시 시도
                    </button>
                )}
            </div>
        </div>
    );
};

export default ErrorMessage;