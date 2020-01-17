({
    doInit : function(component,event, helper ){  
        helper.checkZipCodeOnAccount(component, event, helper);       
    },

    /*
        Tratamento do CEP antes de mandar para a helper
    */
    handleClick : function(component, event, helper) {          
        var cep = component.find("inputCep").get("v.value");           
        cep = cep.length==8 ? cep.substring(0,5) +'-'+cep.substring(5,8) : cep; //customMask
        component.set("v.varCep", cep);
        helper.buscarCepIntegracao(component, event, helper);
    },  

    editClick : function(component, event, helper) {         
        helper.clearFields(component, event, helper); 
    } 
})



