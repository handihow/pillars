var express = require("express");
var router = express.Router();
var path = require("path");

//CSS FILES
router.get('/animate.css', function(req,res){
	res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/animate.css/animate.min.css'));
})

router.get('/keyTable.dataTables.min.css', function(req,res){
	res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-keytable-dt/css/keyTable.dataTables.min.css'));
})

router.get('/buttons.semanticui.min.css', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-buttons-se/css/buttons.semanticui.min.css'));
});

router.get('/dataTables.semanticui.min.css', function(req, res){
	res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-se/css/dataTables.semanticui.min.css'));
});

router.get('/dataTables.select.min.css', function(req, res){
	res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-select-se/css/select.semanticui.min.css'));
});

router.get('/dataTables.checkboxes.min.css', function(req, res){
	res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/jquery-datatables-checkboxes/css/dataTables.checkboxes.css'));
});

router.get('/rowGroup.semanticui.min.css', function(req, res){
	res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-rowgroup-se/css/rowGroup.semanticui.min.css'));
});

router.get('/survey.min.css', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/survey-jquery/survey.min.css'));
});

router.get('/survey.analytics.min.css', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/survey-analytics/survey.analytics.min.css'));
});


//JS FILES
router.get('/jquery.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/jquery/dist/jquery.min.js'));
});

router.get('/jquery.tinymce.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/tinymce/jquery.tinymce.min.js'));
});

router.get('/jquery.dataTables.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net/js/jquery.dataTables.min.js'));
});

router.get('/dataTables.semanticui.min.js', function(req, res){
	res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-se/js/dataTables.semanticui.min.js'));
});

router.get('/dataTables.buttons.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-buttons/js/dataTables.buttons.min.js'));
});

router.get('/dataTables.buttons.semanticui.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-buttons-se/js/buttons.semanticui.min.js'));
});

router.get('/dataTables.buttons.colVis.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-buttons/js/buttons.colVis.min.js'));
});

router.get('/dataTables.buttons.flash.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-buttons/js/buttons.flash.min.js'));
});

router.get('/dataTables.buttons.html5.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-buttons/js/buttons.html5.min.js'));
});

router.get('/dataTables.select.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-select/js/dataTables.select.min.js'));
});

router.get('/dataTables.buttons.print.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-buttons/js/buttons.print.min.js'));
});

router.get('/dataTables.checkboxes.min.js', function(req, res){
	res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/jquery-datatables-checkboxes/js/dataTables.checkboxes.min.js'));
});

router.get('/dataTables.rowGroup.min.js', function(req, res){
	res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/datatables.net-rowgroup/js/dataTables.rowGroup.min.js'));
});

router.get('/dataTables.checkboxes.min.js.map', function(req, res){
	res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/jquery-datatables-checkboxes/js/dataTables.checkboxes.min.js.map'));
});

router.get('/jszip.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/jszip/dist/jszip.min.js'));
});

router.get('/pdfmake.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/pdfmake/build/pdfmake.min.js'));
});

router.get('/vfs_fonts.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/pdfmake/build/vfs_fonts.js'));
});

router.get('/pdfmake.min.js.map', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/pdfmake/build/pdfmake.min.js.map'));
});

router.get('/moment.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/moment/min/moment.min.js'));
});

router.get('/moment.min.js.map', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/moment/min/moment.min.js.map'));
});

router.get('/chart.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/chart.js/dist/Chart.min.js'));
});

router.get('/chartjs-plugin-datalabels', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/chartjs-plugin-datalabels/dist/chartjs-plugin-datalabels.min.js'));
});

router.get('/jspdf.umd.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/jspdf/dist/jspdf.umd.min.js'));
});

router.get('/jspdf.umd.min.js.map', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/jspdf/dist/jspdf.umd.min.js.map'));
});

router.get('/survey.jquery.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/survey-jquery/survey.jquery.min.js'));
});

router.get('/survey.core.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/survey-core/survey.core.min.js'));
});

router.get('/survey.pdf.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/survey-pdf/survey.pdf.min.js'));
});

router.get('/survey.analytics.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/survey-analytics/survey.analytics.min.js'));
});

router.get('/surveyjs-widgets.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/surveyjs-widgets/surveyjs-widgets.min.js'));
});

router.get('/surveyjs-widgets.min.js.map', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/surveyjs-widgets/surveyjs-widgets.min.js.map'));
});

router.get('/plotly.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/plotly.js-dist/plotly.js'));
});

router.get('/html2canvas.min.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/html2canvas/dist/html2canvas.min.js'));
});

router.get('/ckeditor.js', function(req, res) {
    res.sendFile(path.resolve(__dirname.replace('routes', '') + 'node_modules/ckeditor4/ckeditor.js'));
});


module.exports = router;