
interface Metrics { 
    all: string,
    low: string,
    medium: string,
    high: string
}

export const Metrics = ({all, low, medium, high}: Metrics) => {
    return (
        <div className="row border rounded text-center p-2">
            <div className="col d-flex align-items-center  justify-content-center">
                <div>
                    Average time to finish all tasks:
                    <br />
                    <b className="text-primary-emphasis">{all}</b>
                </div>
            </div>
            <div className="col d-flex align-items-center  justify-content-center">
                <div>
                    Average time to finish tasks by priority: <br />
                    <b>
                        <span className="text-success-emphasis">Low: {low}</span>
                        <br />
                        <span className="text-warning-emphasis">Medium: {medium}</span>
                        <br />
                        <span className="text-danger-emphasis">High: {high}</span>
                    </b>
                </div>
            </div>
        </div>
    )
}
