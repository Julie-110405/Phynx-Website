
document.addEventListener("DOMContentLoaded", function () {

    // SAMPLE DELIVERY RECORDS
    const data = [
        {
            id: "DLV-2026-001",
            po: "PO-2026-014",
            supplier: "ABC Garments",
            expected: "Nov 04, 2026",
            actual: "—",
            status: "Expected"
        },
        {
            id: "DLV-2026-002",
            po: "PO-2026-015",
            supplier: "Metro Textile Supply",
            expected: "Nov 03, 2026",
            actual: "Nov 03, 2026",
            status: "Pending Inspection"
        },
        {
            id: "DLV-2026-003",
            po: "PO-2026-016",
            supplier: "Thread & Co.",
            expected: "Nov 02, 2026",
            actual: "Nov 02, 2026",
            status: "Received"
        },
        {
            id: "DLV-2026-004",
            po: "PO-2026-017",
            supplier: "ABC Garments",
            expected: "Nov 01, 2026",
            actual: "Nov 01, 2026",
            status: "Received"
        },
        {
            id: "DLV-2026-005",
            po: "PO-2026-018",
            supplier: "Fabric House",
            expected: "Oct 31, 2026",
            actual: "Oct 31, 2026",
            status: "Inspected"
        }
    ];

    // APPROVED PO SAMPLE SUPPLIERS
    const suppliers = {
        "PO-2026-019": "ABC Garments",
        "PO-2026-020": "Metro Textile Supply",
        "PO-2026-021": "Fabric House"
    };

    const rows = document.getElementById("rows");
    const search = document.getElementById("search");
    const filter = document.getElementById("filter");
    const count = document.getElementById("count");

    const modal = document.getElementById("backdrop");
    const form = document.getElementById("form");

    // DISPLAY DELIVERY RECORDS
    function render() {

        const query = search.value.toLowerCase();
        const selectedStatus = filter.value;

        const filtered = data.filter(record => {

            const matchesStatus =
                !selectedStatus || record.status === selectedStatus;

            const matchesSearch = [
                record.id,
                record.po,
                record.supplier
            ].join(" ").toLowerCase().includes(query);

            return matchesStatus && matchesSearch;
        });

        rows.innerHTML = filtered.length
            ? filtered.map(record => {

                let statusClass = "expected";

                if (record.status === "Received") {
                    statusClass = "received";
                }

                if (record.status === "Pending Inspection") {
                    statusClass = "inspection";
                }

                if (record.status === "Inspected") {
                    statusClass = "complete";
                }

                return `
                    <tr>
                        <td>
                            <div class="primary-cell">${record.id}</div>
                            <div class="secondary-cell">${record.po}</div>
                        </td>

                        <td>${record.supplier}</td>
                        <td>${record.expected}</td>
                        <td>${record.actual}</td>

                        <td>
                            <span class="status ${statusClass}">
                                ${record.status}
                            </span>
                        </td>

                        <td>
                            <button class="action-link"
                                data-view="${record.id}">
                                VIEW
                            </button>
                        </td>
                    </tr>
                `;
            }).join("")
            : `
                <tr>
                    <td colspan="6" class="empty">
                        No matching delivery records.
                    </td>
                </tr>
            `;

        count.textContent =
            filtered.length +
            (filtered.length === 1 ? " record" : " records");
    }

    // VIEW DELIVERY DETAILS
    rows.addEventListener("click", function (event) {

        const button = event.target.closest("[data-view]");

        if (!button) return;

        const record = data.find(
            item => item.id === button.dataset.view
        );

        if (!record) return;

        alert(
            "DELIVERY DETAILS\n\n" +
            "Delivery ID: " + record.id + "\n" +
            "Purchase Order: " + record.po + "\n" +
            "Supplier: " + record.supplier + "\n" +
            "Expected Date: " + record.expected + "\n" +
            "Actual Date: " + record.actual + "\n" +
            "Status: " + record.status
        );
    });

    // MODAL CONTROLS
    function showModal() {
        modal.classList.add("show");
    }

    function hideModal() {
        modal.classList.remove("show");
    }

    document.getElementById("open").addEventListener("click", showModal);
    document.getElementById("close").addEventListener("click", hideModal);
    document.getElementById("cancel").addEventListener("click", hideModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            hideModal();
        }
    });

    // AUTOMATIC SUPPLIER SELECTION FROM PO
    document.getElementById("po").addEventListener("change", function () {

        const selectedPO = this.value;

        document.getElementById("supplier").value =
            suppliers[selectedPO] || "";
    });

    // FORMAT DATE
    function formatDate(value) {

        return new Date(value + "T00:00:00")
            .toLocaleDateString("en-US", {
                month: "short",
                day: "2-digit",
                year: "numeric"
            });
    }

    // SAVE NEW DELIVERY RECORD
    form.addEventListener("submit", function (event) {

        event.preventDefault();

        const po = document.getElementById("po").value;

        if (data.some(record => record.po === po)) {
            alert("A sample delivery record already exists for this PO.");
            return;
        }

        const expectedDate =
            document.getElementById("expected").value;

        const actualDate =
            document.getElementById("actual").value;

        const supplier =
            document.getElementById("supplier").value;

        if (!supplier) {
            alert("Please select a valid Purchase Order.");
            return;
        }

        const id = "DLV-2026-" +
            String(data.length + 1).padStart(3, "0");

        data.unshift({
            id: id,
            po: po,
            supplier: supplier,
            expected: formatDate(expectedDate),
            actual: formatDate(actualDate),
            status: "Received"
        });

        render();
        form.reset();
        hideModal();

        alert("Delivery record " + id + " added successfully.");
    });

    // SEARCH AND FILTER
    search.addEventListener("input", render);
    filter.addEventListener("change", render);

    // RESET FILTERS
    document.getElementById("reset").addEventListener("click", function () {
        search.value = "";
        filter.value = "";
        render();
    });

    // INITIAL DISPLAY
    render();

});
