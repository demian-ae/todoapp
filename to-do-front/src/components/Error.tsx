export const Error = ({error}: {error: string}) => {
    return (
        <div className="text-center mt-3">
            <div className="alert alert-danger" role="alert">
                <strong>An error occurred:</strong> {error}
                <p>Try search again</p>
            </div>
        </div>
    )
}