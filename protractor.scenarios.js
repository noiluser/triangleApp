'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('triApp', function() {
  beforeEach(function() {
    browser.get('/');
    browser.waitForAngular();
  });

  it('should set all side values eq to 1 when loaded', function() {
    expect(element(by.model('fside')).getAttribute('value')).toEqual("1");
    expect(element(by.model('sside')).getAttribute('value')).toEqual("1");
    expect(element(by.model('tside')).getAttribute('value')).toEqual("1");
  });

  it('should disable button when inputs are empty (one of)', function() {
    var btn = element(by.css('[type=button]'));

    element.all(by.css('input[type="number"]')).each(function (item) {
      expect(btn.getAttribute('disabled')).toBe(null);
      item.clear();
      expect(btn.getAttribute('disabled')).toBe('true');
      item.sendKeys("5");
    });
  });

  it('says that the triangle is impossible', function() {
    var btn = element(by.css('[type=button]'));

    element(by.model('fside')).clear().sendKeys("6.3");
    element(by.model('sside')).clear().sendKeys("16.3");
    element(by.model('tside')).clear().sendKeys("6.3");
    btn.click();

    expect(element(by.binding('result')).getText()).toEqual('');
    expect(element(by.binding('error')).getText()).toContain('not exists');
  });

  it('says that the triangle is equilateral', function() {
    var btn = element(by.css('[type=button]'));

    element(by.model('fside')).clear().sendKeys("6.3");
    element(by.model('sside')).clear().sendKeys("6.3");
    element(by.model('tside')).clear().sendKeys("6.3");
    btn.click();

    expect(element(by.binding('result')).getText()).toContain('equilateral');
    expect(element(by.binding('error')).getText()).toEqual('');
  });

  it('says that the triangle is isosceles', function() {
    var btn = element(by.css('[type=button]'));

    element(by.model('fside')).clear().sendKeys("5");
    element(by.model('sside')).clear().sendKeys("3");
    element(by.model('tside')).clear().sendKeys("3");
    btn.click();

    expect(element(by.binding('result')).getText()).toContain('isosceles');
    expect(element(by.binding('error')).getText()).toEqual('');
  });

  it('says that the triangle is scalene', function() {
    var btn = element(by.css('[type=button]'));

    element(by.model('fside')).clear().sendKeys("5");
    element(by.model('sside')).clear().sendKeys("3");
    element(by.model('tside')).clear().sendKeys("4");
    btn.click();

    expect(element(by.binding('result')).getText()).toContain('scalene');
    expect(element(by.binding('error')).getText()).toEqual('');
  });
});
