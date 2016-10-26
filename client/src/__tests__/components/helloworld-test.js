import React from 'react'
import { shallow, mount } from 'enzyme'
import HelloWorldComponent from '../../components/helloworld'
import { InternalComponents } from '../../components/helloworld'

const {
  LastHelloWorld, HelloWorldRow,
  HelloWorldTable
} = InternalComponents

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
      const wrapper = shallow(<LastHelloWorld {...props} />)

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
      const wrapper = shallow(<LastHelloWorld {...props} />)

      validateDefaultStructure(wrapper)
      expect(wrapper.find('p').at(0).text()).toBe('Name: Test 01')
      expect(wrapper.find('p').at(1).text()).toBe('Local Date: Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)')
    })
  })

  describe('hello table row', () => {
    function validateDefaultStructure(wrapper) {
      expect(wrapper.find('tr').length).toBe(1)
      expect(wrapper.find('tr').children().length).toBe(3)
      expect(wrapper.find('td').at(1).text()).toBe('Test 01')
      expect(wrapper.find('td').at(2).text()).toBe('Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)')
    }

    it('render a row with no id', () => {
      const props = {
        hello: {
          id: 0,
          name:'Test 01',
          date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'
        }
      }
      const wrapper = shallow(<HelloWorldRow {...props} />)

      validateDefaultStructure(wrapper)
      expect(wrapper.find('td').at(0).text()).toBe('')
    })

    it('render a row with a defined id', () => {
      const props = {
        hello: {
          id: 1,
          name:'Test 01',
          date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'
        }
      }
      const wrapper = shallow(<HelloWorldRow {...props} />)

      validateDefaultStructure(wrapper)
      expect(wrapper.find('td').at(0).text()).toBe('1')
    })
  })

  describe('hello table', () => {
    it('render a complete hello table', () => {
      const props = {
        helloList: [
          {
            id: 0,
            _id: 5555,
            name:'Test 01',
            date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'
          },
          {
            id: 25,
            name:'Test 02',
            date:'Mon Oct 11 2016 00:00:00 GMT-0200 (BRST)'
          }
        ]
      }
      const wrapper = shallow(<HelloWorldTable {...props} />)

      expect(wrapper.find('table').hasClass('table')).toBe(true)
      expect(wrapper.find('table').hasClass('table-striped')).toBe(true)
      expect(wrapper.find('tbody').children().length).toBe(2)
      expect(wrapper.find('tbody').children().at(0).key()).toBe('5555')
      expect(wrapper.find('tbody').children().at(1).key()).toBe('25')
    })
  })

  describe('hello main component', () => {
    it('render a main hello world component with zero hello', () => {
      const props = {
        fetchHelloList: jest.fn(),
        handleNewHello: jest.fn(),
        hellos: []
      }
      const wrapper = mount(<HelloWorldComponent {...props} />)

      expect(props.fetchHelloList).toHaveBeenCalledTimes(1)
      expect(wrapper.props().hellos.length).toBe(0)
      expect(wrapper.find('div.row').find('h3').length).toBe(1)
      expect(wrapper.find('div.row').find('h3').text()).toBe('There is no Hello yet!')
    })

    it('render a main hello world component with one hello', () => {
      const props = {
        fetchHelloList: jest.fn(),
        handleNewHello: jest.fn(),
        hellos: [
          {
            id: 25,
            name:'Test 02',
            date:'Mon Oct 11 2016 00:00:00 GMT-0200 (BRST)'
          }
        ]
      }
      const wrapper = mount(<HelloWorldComponent {...props} />)

      expect(props.fetchHelloList).toHaveBeenCalledTimes(1)
      expect(wrapper.props().hellos.length).toBe(1)
      expect(wrapper.find('div.row').find('h3').length).toBe(0)
      expect(wrapper.find('div.row').find('table').length).toBe(1)
      expect(wrapper.find('div.row').find('table').find('tr').length).toBe(2)
    })

    it('render a main hello world component with two hello', () => {
      const props = {
        fetchHelloList: jest.fn(),
        handleNewHello: jest.fn(),
        hellos: [
          {
            id: 1,
            name:'Test 01',
            date:'Mon Oct 10 2016 00:00:00 GMT-0200 (BRST)'
          },
          {
            id: 25,
            name:'Test 02',
            date:'Mon Oct 11 2016 00:00:00 GMT-0200 (BRST)'
          }
        ]
      }
      const wrapper = mount(<HelloWorldComponent {...props} />)
      
      expect(props.fetchHelloList).toHaveBeenCalledTimes(1)
      expect(wrapper.props().hellos.length).toBe(2)
      expect(wrapper.find('div.row').find('h3').length).toBe(0)
      expect(wrapper.find('div.row').find('table').length).toBe(1)
      expect(wrapper.find('div.row').find('table').find('tr').length).toBe(3)
    })
  })
})
