({
    doInit : function(component,event, helper ){   
        this.loadJquery(component,event,helper);
        helper.checkZipCodeOnAccount(component, event, helper);
       
    },

    handleClick : function(component, event, helper) {          
        //
        helper.buscarCepIntegracao(component, event, helper);
    },  

    
    editClick : function(component, event, helper) {         
        helper.clearFields(component, event, helper); 
    },

    loadJquery : function(component, event, helper) {
         console.log('loadJquery.');
        jQuery(document).ready(function(){
            $(".cep").mask("99999-999");
        });
    }   
})



