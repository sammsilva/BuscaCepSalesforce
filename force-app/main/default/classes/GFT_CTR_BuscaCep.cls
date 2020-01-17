public with sharing class GFT_CTR_BuscaCep {
@AuraEnabled
    public static Object BuscaCep(String newCep, String newAccountId){    
        return GFT_Cep.buscaCep(newCep, newAccountId);
    }
@AuraEnabled
    public static Object checkPostalCodeOnAccount(String newAccountId) {
        return GFT_Cep.checkPostalCodeOnAccount(newAccountId);
    }
}
