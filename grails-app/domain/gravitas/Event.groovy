package gravitas

import grails.rest.Resource

@Resource(uri = '/data/events', formats=['json', 'xml'])
class Event {

    String name
    String description
    String date

    static constraints = {
        name blank: false
        description blank: false
        date blank: false
    }
}