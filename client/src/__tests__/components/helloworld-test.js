import React from 'react'
import { shallow } from 'enzyme'
import { LastHelloWorldTest } from '../../components/helloworld'

describe('hello world component', () => {
  describe('last hello', () => {
    function validateDefaultStructure(wrapper) {
      expect(wrapper.find('div').hasClass('helloworld__last')).toBe(true)
      expect(wrapper.find('div').children().length).toBe(3)
      expect(wrapper.find('h1').text()).toBe('Last Hello')
      expect(wrapper.find('p').length).toBe(2);
    }

    it('render hello not provided yet', () => {
      const props = {
        hello: undefined
      }
      const wrapper = shallow(<LastHelloWorldTest {...props} />)

      validateDefaultStructure(wrapper)
      expect(wrapper.find('p').at(0).text()).toBe('Name: Nobody yet')
      expect(wrapper.find('p').at(1).text()).toBe('Local Date: No local date')
    })

    it('render hello', () => {
      const props = {
        hello: {
          id: 1,
          name:'Test 01',
          date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'
        }
      }
      const wrapper = shallow(<LastHelloWorldTest {...props} />)

      validateDefaultStructure(wrapper)
      expect(wrapper.find('p').at(0).text()).toBe('Name: Test 01')
      expect(wrapper.find('p').at(1).text()).toBe('Local Date: Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)')
    })
  })
})
