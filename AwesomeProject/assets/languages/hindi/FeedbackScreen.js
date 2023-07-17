export default {
    feedback_tab : 'सुझाव',
    feedbackTitle : 'सुझाव',
    submit: 'जमा करें',
    name: 'नाम',
    state: 'राज्य',
    district: 'ज़िला',
    block: 'ब्लॉक',
    mobile: 'मोबाइल/व्हाट्सएप नंबर',
    incomplete: 'सभी प्रश्न अनिवार्य हैं। कृपया उनका उत्तर दें और फिर फॉर्म जमा करें।',
    form: {
        "feedback_for_bulletin_date": { q: 'बुलेटिन जारी होने की तिथि जिसके लिए सुझाव (फीडबैक) दिया जा रहा है', type: 'Date' },
        "bulletin_useful": { q: 'क्या जारी की गई कृषि-मौसम परामर्श बुलेटिन कृषि कार्य के लिए उपयोगी थी?', type: 'Radio Button', options: [{label: 'हाँ'}, {label: 'कुछ काम की थी परन्तु प्रभावकारी नहीं थी'},{label: 'नहीं'}] },
        "bulletin_not_useful": { q: 'यदि बुलेटिन उपयोगी नहीं थी तो उसका क्या कारण है?', type: 'Radio Button', options: [{label: 'हमारे कृषि कार्य से सम्बद्ध नहीं थी'}, {label: "उपयोगी थी पर हम उसका अनुपालन नहीं कर सके"}, {label: 'मौसम पूर्वानुमान सही नहीं था'}, {label: "समय पर एडवाइजरी नहीं मिली"}, {label: 'अन्य कारण'}] },
        "bulletin_effective_part": { q: 'बुलेटिन का कौन सा भाग अत्यधिक उपयोगी था?', type: 'Radio Button', options: [{label: 'मौसम पूर्वानुमान'}, {label: 'मौसम आधारित फसल सलाह'}, {label: 'मौसम आधारित रोग/कीट सम्बन्धी सलाह'},{label: 'मृदा में नमी आधारित सिंचाई सम्बन्धी सलाह'},{label: 'उर्वरक/कीटनाशक प्रयोग सम्बन्धी सलाह'},{label: 'चरम मौसमी घटनाओं के दुष्प्रभाव सम्बन्धी सलाह'}] },
        "useful_agri_operations": { q: 'यह बुलेटिन किन कृषि कार्यों के लिए उपयोगी थी?', type: 'Radio Button', options: [{label:'खेत की तैयारी के लिए'}, {label:'बुवाई/रोपाई के लिए'}, {label:'सिंचाई के लिए'}, {label:'उर्वरक प्रयोग के लिए'}, {label:'कीटनाशी/खरपतवारनाशी प्रयोग के लिए'}, {label:'फसल कटाई/मड़ाई के लिए'}, {label:'भण्डारण/परिवहन/विपणन इत्यादि हेतु'}] },
        "opinion_weather": { q: 'आपके विचार से अगले पांच दिनों के लिए जारी किया गया मौसम पूर्वानुमान कैसा रहा?', type: 'Radio Button', options: [{label:'संतोषजनक'}, {label: 'आंशिक रूप से सही था'}, {label:'संतोषजनक नहीं था'}] },
        "shared_w_others": { q: 'क्या आप कृषि-मौसम परामर्श बुलेटिन को अन्य किसानों के साथ साझा करते हैं?', type: 'Radio Button', options: [{label: 'हाँ'}, {label: 'नहीं'}] },
        "shared_num": {q: 'यदि हां, तो कम से कम कितने किसानों के साथ?', type: 'Text Input', max: 4 },
        "economic_benefits": { q: 'इस बुलेटिन में दी गई सलाह से आपको कितने रूपये का आर्थिक लाभ हुआ?', type: 'Text Input', max: 50, },
        "other_info": { q: 'एग्रोमेट एडवाइजरी बुलेटिन में आप और कौन सी जानकारी प्राप्त करना चाहते हैं?', type: 'Text Input', max: 50, },
        "ratings": { q: 'कृषि-मौसम परामर्श बुलेटिन के लिए आपका मूल्यांकन', type: 'Ratings' }
    }, 
};