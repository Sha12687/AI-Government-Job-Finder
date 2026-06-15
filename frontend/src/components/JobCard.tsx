type Props = {
  job: any;
};

function JobCard({ job }: Props) {

  let details: any = {};

  try {

    if (typeof job.details === "string") {

      const cleaned = job.details
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      details = JSON.parse(cleaned);

    } else {

      details = job.details || {};
    }

  } catch (error) {

    console.log("JSON Error:", error);

    details = {};
  }

  const formatValue = (value: any) => {

    if (!value) return "Not Mentioned";

    if (typeof value === "object") {

      return Object.entries(value)
        .map(
          ([key, val]) =>
            `${key}: ${val}`
        )
        .join(" | ");
    }

    return String(value);
  };

  return (

    <div
      style={{
        background: "#ffffff",
        borderRadius: "20px",
        padding: "32px",
        marginTop: "30px",
        boxShadow:
          "0 8px 24px rgba(0,0,0,0.08)",
        border:
          "1px solid #e5e7eb"
      }}
    >

      {/* HEADER */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}
      >

        <div>

          <h2
            style={{
              margin: 0,
              fontSize: "30px",
              color: "#111827"
            }}
          >
            {job.title}
          </h2>

          <p
            style={{
              marginTop: "8px",
              color: "#6b7280"
            }}
          >
            Government Job Notification
          </p>

        </div>

        <a
          href={job.link}
          target="_blank"
          rel="noreferrer"
          style={{
            background: "#2563eb",
            color: "white",
            padding:
              "14px 22px",
            borderRadius: "12px",
            textDecoration:
              "none",
            fontWeight: "bold",
            fontSize: "16px"
          }}
        >
          Apply Now →
        </a>

      </div>

      {/* QUICK INFO */}

      <div
        style={{
          marginTop: "30px",
          background:
            "#f9fafb",
          borderRadius: "16px",
          padding: "24px",
          border:
            "1px solid #e5e7eb"
        }}
      >

        <h3
          style={{
            marginTop: 0,
            marginBottom: "20px",
            color: "#111827"
          }}
        >
          Quick Information
        </h3>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px"
          }}
        >

          <QuickItem
            label="Total Vacancies"
            value={formatValue(
              details[
                "Total Vacancies"
              ]
            )}
          />

          <QuickItem
            label="Opening Date"
            value={formatValue(
              details[
                "Opening Date"
              ]
            )}
          />

          <QuickItem
            label="Closing Date"
            value={formatValue(
              details[
                "Closing Date"
              ]
            )}
          />

          <QuickItem
            label="Salary"
            value={formatValue(
              details["Salary"]
            )}
          />

        </div>

      </div>

      {/* AGE LIMIT */}

      <Section
        title="Age Limit"
        content={formatValue(
          details["Age Limit"]
        )}
      />

      {/* APPLICATION FEES */}

      <Section
        title="Application Fees"
        content={formatValue(
          details[
            "Application Fees"
          ]
        )}
      />

      {/* ELIGIBILITY */}

      <Section
        title="Eligibility"
        content={formatValue(
          details["Eligibility"]
        )}
      />

      {/* EDUCATION */}

      <Section
        title="Education Qualification"
        content={formatValue(
          details[
            "Education Qualification"
          ]
        )}
      />

    </div>
  );
}

/* QUICK ITEM */

type QuickItemProps = {
  label: string;
  value: string;
};

function QuickItem({
  label,
  value
}: QuickItemProps) {

  return (

    <div
      style={{
        background: "white",
        padding: "18px",
        borderRadius: "12px",
        border:
          "1px solid #e5e7eb"
      }}
    >

      <h4
        style={{
          margin: 0,
          marginBottom: "10px",
          color: "#2563eb",
          fontSize: "16px"
        }}
      >
        {label}
      </h4>

      <p
        style={{
          margin: 0,
          color: "#374151",
          lineHeight: "1.6"
        }}
      >
        {value}
      </p>

    </div>
  );
}

/* SECTION */

type SectionProps = {
  title: string;
  content: string;
};

function Section({
  title,
  content
}: SectionProps) {

  return (

    <div
      style={{
        marginTop: "24px",
        background:
          "#f9fafb",
        padding: "24px",
        borderRadius: "16px",
        border:
          "1px solid #e5e7eb"
      }}
    >

      <h3
        style={{
          marginTop: 0,
          marginBottom: "14px",
          color: "#111827"
        }}
      >
        {title}
      </h3>

      <p
        style={{
          margin: 0,
          color: "#4b5563",
          lineHeight: "1.9",
          fontSize: "15px"
        }}
      >
        {content}
      </p>

    </div>
  );
}

export default JobCard;