
document.addEventListener("DOMContentLoaded", function () {

    const newDeliveryBtn = document.getElementById("newDeliveryBtn");
    const viewAllBtn = document.getElementById("viewAllBtn");
    const startInspectionBtn = document.getElementById("startInspectionBtn");
    const reviewDiscrepanciesBtn = document.getElementById("reviewDiscrepanciesBtn");
    const reviewIssuesBtn = document.getElementById("reviewIssuesBtn");
    const openInspectionBtn = document.getElementById("openInspectionBtn");

    // Record Incoming Delivery
    if (newDeliveryBtn) {
        newDeliveryBtn.addEventListener("click", function () {
            window.location.href = "incoming-deliveries.html";
        });
    }

    // View All Incoming Deliveries
    if (viewAllBtn) {
        viewAllBtn.addEventListener("click", function () {
            window.location.href = "incoming-deliveries.html";
        });
    }

    // Start Inspection
    if (startInspectionBtn) {
        startInspectionBtn.addEventListener("click", function () {
            window.location.href = "delivery-inspection.html";
        });
    }

    // Review Discrepancies
    if (reviewDiscrepanciesBtn) {
        reviewDiscrepanciesBtn.addEventListener("click", function () {
            window.location.href = "delivery-discrepancies.html";
        });
    }

    // Review Issues
    if (reviewIssuesBtn) {
        reviewIssuesBtn.addEventListener("click", function () {
            window.location.href = "delivery-discrepancies.html";
        });
    }

    // Open Inspection
    if (openInspectionBtn) {
        openInspectionBtn.addEventListener("click", function () {
            window.location.href = "delivery-inspection.html";
        });
    }

});
