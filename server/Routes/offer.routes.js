const OfferController = require('../controllers/offer.controller');


module.exports = function(app){
    
    app.post('/api/offer/new', OfferController.createOffer);
    app.get('/api/offers', OfferController.getAllOffers);
    app.get('/api/offer/:id', OfferController.getOffer);
    app.put('/api/offer/:id/', OfferController.updateOffer);
    app.delete('/api/offer/:id', OfferController.deleteOffer);
}

