({
    buscarCepIntegracao : function(component, event, helper) {         
        var cep = component.find("inputCep").get("v.value");     
        
        
        
        var varAccountId =  component.get("v.recordId");  
        var action = component.get("c.buscaCep");

        action.setParams({
            newCep: cep,
            newAccountId : varAccountId
        }); 
       
        action.setCallback(this, function(data){  
            var result = false;
            if(data.getState() == 'SUCCESS') {                
                var jsonResult = JSON.parse(data.getReturnValue());             
                component.set("v.varLogradouro", jsonResult['logradouro']);
                component.set("v.varComplemento", jsonResult['complemento']);
                component.set("v.varBairro", jsonResult['bairro']);
                component.set("v.varCidade", jsonResult['localidade']);
                component.set("v.varUf", jsonResult['uf']);
                component.set("v.varIbge", jsonResult['ibge']);
                component.set("v.varGia", jsonResult['gia']);   
                component.set("v.editControl", false);
                component.set("v.inputCepControl", true);                  
                result = true;
              } 
             helper.showToast(component, event, helper, result);  
                   
        });
        $A.enqueueAction(action);
    },

    checkZipCodeOnAccount : function(component, event, helper) {     
        component.set("v.resultsControl", true);        
        var varAccountId = component.get("v.recordId");
        var action = component.get("c.checkPostalCodeOnAccount");    
        action.setParams({
            newAccountId: varAccountId
        });

        action.setCallback(this, function(response){           
            var returnJson =  response.getReturnValue();    
            var returnStatus = returnJson['exists'];   
            if(returnStatus) {                                      
                component.set("v.editControl", false);  
                component.set("v.inputCepControl", true); 
                component.set("v.varCep", returnJson['cep']);                
                helper.populateFields(component, returnJson);   
            } else {              
                component.set("v.editControl", true); 
                component.set("v.inputCepControl", false);                              
            }                                                   
        });     
        $A.enqueueAction(action);       
    },

    clearFields : function(component) {               
        component.set("v.inputCepControl", false);      
        component.set("v.varLogradouro", "");
        component.set("v.varComplemento", "");
        component.set("v.varBairro", "");
        component.set("v.varCidade", "");
        component.set("v.varUf", "");
        component.set("v.varIbge", "");
        component.set("v.varGia", "");      
        component.set("v.editControl", true);  
    },  
    
    populateFields : function(component, returnJson) {   
        component.set("v.varCep", returnJson['cep']);    
        component.set("v.varLogradouro", returnJson['logradouro']);           
        component.set("v.varComplemento", returnJson['complemento']);
        component.set("v.varBairro", returnJson['bairro']);
        component.set("v.varCidade", returnJson['localidade']);
        component.set("v.varUf", returnJson['uf']);
        component.set("v.varIbge", returnJson['ibge']);
        component.set("v.varGia", returnJson['gia']);     
    },  

    showToast : function(component, event, helper, result) {
        var isSucess = result;
        var customMessage;
        var customTitle;
        var customType;
        console.log("toast " + isSucess);
        if(isSucess) {
            customMessage = "The record has been updated successfully.";
            customTitle = "Success!";
            customType = "success";
        } else {
            customMessage = "Please provide a valid CEP.";
            customTitle = "Ops!";
            customType = "warning";
        }

        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type" : customType,
            "title": customTitle,
            "message": customMessage
        });
        toastEvent.fire();
    }
})