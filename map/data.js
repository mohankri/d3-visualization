
var sampledata = [
 ["PACUR", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Certified", "2015-02-06"],
 ["TECAN TEST", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Certified", "2015-02-06"],
 ["TECAN SYSTEMS", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Certified", "2015-02-06"],
 ["TECAN TEST", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Certified", "2015-02-06"],
 ["TECAN TEST", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Certified", "2015-02-06"],
 ["TECAN TEST", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Certified", "2015-02-06"],
 ["TECAN TEST", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Certified", "2015-02-06"],
 ["TECAN TEST", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Certified", "2015-02-06"],
 ["TECAN TEST", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Certified", "2015-02-06"],
 ["TECAN TEST", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Certified", "2015-02-06"],
 ["TECAN TEST", "Entity Linked", "JAPAN", "AIDA CHEMICAL INDUSTRIES CO LTD-JAPAN-AU", "AU", "Non-Certified", "2015-02-06"]];

var certifiedList = { };
var uncertifiedList = { };

sample = _.map(sampledata, function(elem) {
	if (elem[5] == "Certified") {
		certifiedList[elem[2].trim()] = (certifiedList[elem[2].trim()] || 0) + 1;
	} else {
		uncertifiedList[elem[2].trim()] = (uncertifiedList[elem[2].trim()] || 0) + 1;
	}
	return [elem[0], elem[1], elem[2].trim(), elem[3].trim(), elem[4], elem[5], elem[6]]
})  

console.log("Certified List " + certifiedList['JAPAN']);
console.log("UnCertified List " + uncertifiedList['JAPAN']);


var geolocation = {
	"JAPAN": { lat: 36.204824, lng: 138.252924}
}