/**
 * Interface for the Metrics component props.
 */
interface Metrics { 
    all: string,
    low: string,
    medium: string,
    high: string
}

/**
 * A component that displays metrics for task completion times.
 * @param {Metrics} props - The properties object.
 * @param {string} props.all - The average time to finish all tasks.
 * @param {string} props.low - The average time to finish low priority tasks.
 * @param {string} props.medium - The average time to finish medium priority tasks.
 * @param {string} props.high - The average time to finish high priority tasks.
 * @returns {JSX.Element} The rendered metrics component.
 */
export const Metrics = ({all, low, medium, high}: Metrics): JSX.Element => {
    return (
        <div className="row border rounded text-center p-2">
            <div className="col d-flex align-items-center justify-content-center">
                <div>
                    Average time to finish all tasks:
                    <br />
                    <b className="text-primary-emphasis">{all}</b>
                </div>
            </div>
            <div className="col d-flex align-items-center justify-content-center">
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