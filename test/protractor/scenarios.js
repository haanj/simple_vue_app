describe('our first angular test homepage', function() {                        
  beforeEach(function() {                                
    browser.get('http://127.0.0.1:8080/')                                
  })                                

  it('should have the correct title', function() {                              
    expect(browser.getTitle()).toEqual('My Snack List')                 
  })                                
      

  it('should add a new snack', function() {
    element(by.id('addSnack')).click()

    var newName = element(by.id('newName'))
    var newIngredients = element(by.id('newIngredients'))
    var newTags = element(by.id('newTags'))
    var addSnackButton = element(by.buttonText('Add Snack'))

    newName.sendKeys('food')
    newIngredients.sendKeys('food, stuff')
    newTags.sendKeys('sustenance')
    addSnackButton.click()

    expect(newName.getAttribute('value')).toEqual('food')
    expect(true)
    expect(true)
  })
})
