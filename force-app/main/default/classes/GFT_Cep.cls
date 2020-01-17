public with sharing class GFT_Cep {
    
    @AuraEnabled
    public static Object buscaCep(String newCep, String newAccountId) { 
        HttpResponse data = null;      
        try {
                String[]tempCep = newCep.split('-');   
                String cep = tempCep.get(0) + tempCep.get(1);              
                data = buildViaCepApi(cep);  
                Map<String, Object> m = (Map<String, Object>)JSON.deserializeUntyped(data.getBody());                  
                if(data.getStatus()=='OK') {                                                                        
                    Account myAccount = findAccount(newAccountId); 
                    populateAccount(m, myAccount);                                
                }               
                return data.getBody();    

        } catch(Exception e) {
                System.debug(e); 
                
        }    
        return data.getBody(); 
    }

@AuraEnabled
public static Object checkPostalCodeOnAccount(String newAccountId){
    Account myAccount = findAccount(newAccountId);   
    Map<String, Object> mResult = new Map<String, Object>();
    if(myAccount.Cep__c != null) {        
      mResult.put('cep', String.valueOf(myAccount.Cep__c));
      mResult.put('logradouro', String.valueOf(myAccount.Logradouro__c));
      mResult.put('localidade', String.valueOf(myAccount.Cidade__c));
      mResult.put('bairro', String.valueOf(myAccount.Bairro__c));
      mResult.put('complemento', String.valueOf(myAccount.Complemento__c));
      mResult.put('uf', String.valueOf(myAccount.Uf__c));
      mResult.put('ibge', String.valueOf(myAccount.Ibge__c));
      mResult.put('gia',String.valueOf(myAccount.Gia__c));
      mResult.put('exists', true);       
      return mResult;
    }        
    mResult.put('exists', false);
    return mResult; 
}

//find an account by its ID
private static Account findAccount (String newAccountId) {
        Account myAccount = [SELECT Id, Name, Cep__c, Logradouro__c, Cidade__c, Bairro__c, Complemento__c, Uf__c, Ibge__c, Gia__c FROM Account WHERE Id =: newAccountId];
        return myAccount;
    }

//establish connection with viacep api - returns httpResponse

private static HttpResponse buildViaCepApi(String newCep) {
        String urlConnection = 'https://viacep.com.br/ws/'+ newCep +'/json/';
        HttpRequest myHttpReq = new HttpRequest();    
        myHttpReq.setMethod('GET');
        myHttpReq.setEndPoint(urlConnection);
        Http http = new Http();
        HttpResponse httpResponse = http.send(myHttpReq);      
        return httpResponse;
    }  

private static void populateAccount(Map<String, Object> m, Account myAccount){
        myAccount.Cep__c = String.valueOf(m.get('cep')); 
        myAccount.Logradouro__c = String.valueOf(m.get('logradouro')); 
        myAccount.Complemento__c = String.valueOf(m.get('complemento')); 
        myAccount.Bairro__c = String.valueOf(m.get('bairro')); 
        myAccount.Cidade__c = String.valueOf(m.get('localidade')); 
        myAccount.Uf__c = String.valueOf(m.get('uf')); 
        myAccount.Ibge__c = String.valueOf(m.get('ibge')); 
        myAccount.Gia__c = String.valueOf(m.get('gia'));    
        update myAccount;
    }
}
