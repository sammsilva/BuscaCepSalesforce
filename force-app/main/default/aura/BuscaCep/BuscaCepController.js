({
    doInit : function(component,event, helper ){   
        helper.checkZipCodeOnAccount(component, event, helper);
       
    },

    handleClick : function(component, event, helper) {          

        helper.buscarCepIntegracao(component, event, helper);
    },

    
    editClick : function(component, event, helper) {         
        helper.clearFields(component, event, helper); 
    },

    loadJquery : function(component, event, helper) {     
        console.log("chamou loadJquery");       
        jQuery("document").ready(function(){
            console.log("chamou jQuery"); 
            $('.varCep').mask('00000-000');            
        });
          
    }
    
})



