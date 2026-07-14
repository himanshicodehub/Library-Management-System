import "../../styles/Dashboard.css";

function StatCard({

    title,

    value,

    icon,

    color,

    subtitle

}) {

    return (

        <div className="col-lg-3 col-md-6 mb-4">

            <div
                className="stat-card"
                style={{

                    background: color

                }}
            >

                <div className="stat-card-body">

                    <div>

                        <p className="stat-title">

                            {title}

                        </p>

                        <h2>

                            {value}

                        </h2>

                        <small>

                            {subtitle}

                        </small>

                    </div>

                    <div className="stat-icon">

                        {icon}

                    </div>

                </div>

            </div>

        </div>

    );

}

export default StatCard;