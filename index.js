var express = require("express");
var templates = require("./database/templates.js");
var utils = require("./jsutils/utils.js");

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,           
   optionSuccessStatus:200,
}

var app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.listen(3000, () => {
    console.log("Server running on port 3000");
});

var applications = templates.initialTemplate()['applications'];

app.get("/applications", (req, res, next) => {
    res.json(applications);
});

app.get("/application", (req, res, next) => {
    var appName = req.query.name;
    var application = utils.getApplication(applications, appName);
    res.json(application);
});

app.get("/configurationChangesForApplication", (req, res, next) => {
    var appName = req.query.name;
    var configurationChanges = utils.getAuditLogsForApplication(applications, appName);
    res.json(configurationChanges);
});


app.post('/technicalConfiguration', function(request, response){
    var techConfiguration = request.body;
    var version = utils.updateTechnicalConfiguration(applications, techConfiguration);
    response.send({"version" : version});    
});


app.post('/metadataConfiguration', function(request, response){
    var metadataConfiguration = request.body;
    var version = utils.updateMetadataConfiguration(applications, metadataConfiguration);
    response.send({"version" : version});    
});
