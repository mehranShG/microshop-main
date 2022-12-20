'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">microshop-main documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AuthModule-50f25ed204841d7a9a61db5116cc3797a47479f06f66105fbc8c75ce8a3f33f60362bad9f248f151cb39c963188ee715d2f4ab7a7a95ed027a8ce9c86d2bf944"' : 'data-target="#xs-controllers-links-module-AuthModule-50f25ed204841d7a9a61db5116cc3797a47479f06f66105fbc8c75ce8a3f33f60362bad9f248f151cb39c963188ee715d2f4ab7a7a95ed027a8ce9c86d2bf944"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-50f25ed204841d7a9a61db5116cc3797a47479f06f66105fbc8c75ce8a3f33f60362bad9f248f151cb39c963188ee715d2f4ab7a7a95ed027a8ce9c86d2bf944"' :
                                            'id="xs-controllers-links-module-AuthModule-50f25ed204841d7a9a61db5116cc3797a47479f06f66105fbc8c75ce8a3f33f60362bad9f248f151cb39c963188ee715d2f4ab7a7a95ed027a8ce9c86d2bf944"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-50f25ed204841d7a9a61db5116cc3797a47479f06f66105fbc8c75ce8a3f33f60362bad9f248f151cb39c963188ee715d2f4ab7a7a95ed027a8ce9c86d2bf944"' : 'data-target="#xs-injectables-links-module-AuthModule-50f25ed204841d7a9a61db5116cc3797a47479f06f66105fbc8c75ce8a3f33f60362bad9f248f151cb39c963188ee715d2f4ab7a7a95ed027a8ce9c86d2bf944"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-50f25ed204841d7a9a61db5116cc3797a47479f06f66105fbc8c75ce8a3f33f60362bad9f248f151cb39c963188ee715d2f4ab7a7a95ed027a8ce9c86d2bf944"' :
                                        'id="xs-injectables-links-module-AuthModule-50f25ed204841d7a9a61db5116cc3797a47479f06f66105fbc8c75ce8a3f33f60362bad9f248f151cb39c963188ee715d2f4ab7a7a95ed027a8ce9c86d2bf944"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/OrdersModule.html" data-type="entity-link" >OrdersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-OrdersModule-0030ec66b815813beacbd438e1a05a44b10bdb78fe5c52cf13c7f84c3c7ae9c41b7e5b7d65936ffef4da47681e407b24c3c821c21735bda10ca03eb23064d1d8"' : 'data-target="#xs-controllers-links-module-OrdersModule-0030ec66b815813beacbd438e1a05a44b10bdb78fe5c52cf13c7f84c3c7ae9c41b7e5b7d65936ffef4da47681e407b24c3c821c21735bda10ca03eb23064d1d8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-OrdersModule-0030ec66b815813beacbd438e1a05a44b10bdb78fe5c52cf13c7f84c3c7ae9c41b7e5b7d65936ffef4da47681e407b24c3c821c21735bda10ca03eb23064d1d8"' :
                                            'id="xs-controllers-links-module-OrdersModule-0030ec66b815813beacbd438e1a05a44b10bdb78fe5c52cf13c7f84c3c7ae9c41b7e5b7d65936ffef4da47681e407b24c3c821c21735bda10ca03eb23064d1d8"' }>
                                            <li class="link">
                                                <a href="controllers/OrdersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-OrdersModule-0030ec66b815813beacbd438e1a05a44b10bdb78fe5c52cf13c7f84c3c7ae9c41b7e5b7d65936ffef4da47681e407b24c3c821c21735bda10ca03eb23064d1d8"' : 'data-target="#xs-injectables-links-module-OrdersModule-0030ec66b815813beacbd438e1a05a44b10bdb78fe5c52cf13c7f84c3c7ae9c41b7e5b7d65936ffef4da47681e407b24c3c821c21735bda10ca03eb23064d1d8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-OrdersModule-0030ec66b815813beacbd438e1a05a44b10bdb78fe5c52cf13c7f84c3c7ae9c41b7e5b7d65936ffef4da47681e407b24c3c821c21735bda10ca03eb23064d1d8"' :
                                        'id="xs-injectables-links-module-OrdersModule-0030ec66b815813beacbd438e1a05a44b10bdb78fe5c52cf13c7f84c3c7ae9c41b7e5b7d65936ffef4da47681e407b24c3c821c21735bda10ca03eb23064d1d8"' }>
                                        <li class="link">
                                            <a href="injectables/OrdersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >OrdersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductModule.html" data-type="entity-link" >ProductModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ProductModule-eb7c88b91749fc780a5f9ec5d2f7b4b0095eb5323c3bbdd3a8bcfbf33a2be7299f7ce478c78aba0d0c479427b343cfdad4093024a03f1040433334bff7d17498"' : 'data-target="#xs-controllers-links-module-ProductModule-eb7c88b91749fc780a5f9ec5d2f7b4b0095eb5323c3bbdd3a8bcfbf33a2be7299f7ce478c78aba0d0c479427b343cfdad4093024a03f1040433334bff7d17498"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ProductModule-eb7c88b91749fc780a5f9ec5d2f7b4b0095eb5323c3bbdd3a8bcfbf33a2be7299f7ce478c78aba0d0c479427b343cfdad4093024a03f1040433334bff7d17498"' :
                                            'id="xs-controllers-links-module-ProductModule-eb7c88b91749fc780a5f9ec5d2f7b4b0095eb5323c3bbdd3a8bcfbf33a2be7299f7ce478c78aba0d0c479427b343cfdad4093024a03f1040433334bff7d17498"' }>
                                            <li class="link">
                                                <a href="controllers/ProductController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/ProductMicroController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductMicroController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProductModule-eb7c88b91749fc780a5f9ec5d2f7b4b0095eb5323c3bbdd3a8bcfbf33a2be7299f7ce478c78aba0d0c479427b343cfdad4093024a03f1040433334bff7d17498"' : 'data-target="#xs-injectables-links-module-ProductModule-eb7c88b91749fc780a5f9ec5d2f7b4b0095eb5323c3bbdd3a8bcfbf33a2be7299f7ce478c78aba0d0c479427b343cfdad4093024a03f1040433334bff7d17498"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProductModule-eb7c88b91749fc780a5f9ec5d2f7b4b0095eb5323c3bbdd3a8bcfbf33a2be7299f7ce478c78aba0d0c479427b343cfdad4093024a03f1040433334bff7d17498"' :
                                        'id="xs-injectables-links-module-ProductModule-eb7c88b91749fc780a5f9ec5d2f7b4b0095eb5323c3bbdd3a8bcfbf33a2be7299f7ce478c78aba0d0c479427b343cfdad4093024a03f1040433334bff7d17498"' }>
                                        <li class="link">
                                            <a href="injectables/ProductService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UserModule.html" data-type="entity-link" >UserModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-UserModule-49170b5a6ea587ebf482dd091907a2113dcd67f96ed62d2a52803fd9cbf676678e92b9fb45a1e475d5405e8c624d8a6a2679527d2f1ceaae4b82079c20bcd2f4"' : 'data-target="#xs-controllers-links-module-UserModule-49170b5a6ea587ebf482dd091907a2113dcd67f96ed62d2a52803fd9cbf676678e92b9fb45a1e475d5405e8c624d8a6a2679527d2f1ceaae4b82079c20bcd2f4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UserModule-49170b5a6ea587ebf482dd091907a2113dcd67f96ed62d2a52803fd9cbf676678e92b9fb45a1e475d5405e8c624d8a6a2679527d2f1ceaae4b82079c20bcd2f4"' :
                                            'id="xs-controllers-links-module-UserModule-49170b5a6ea587ebf482dd091907a2113dcd67f96ed62d2a52803fd9cbf676678e92b9fb45a1e475d5405e8c624d8a6a2679527d2f1ceaae4b82079c20bcd2f4"' }>
                                            <li class="link">
                                                <a href="controllers/UserController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/UserMicroController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserMicroController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UserModule-49170b5a6ea587ebf482dd091907a2113dcd67f96ed62d2a52803fd9cbf676678e92b9fb45a1e475d5405e8c624d8a6a2679527d2f1ceaae4b82079c20bcd2f4"' : 'data-target="#xs-injectables-links-module-UserModule-49170b5a6ea587ebf482dd091907a2113dcd67f96ed62d2a52803fd9cbf676678e92b9fb45a1e475d5405e8c624d8a6a2679527d2f1ceaae4b82079c20bcd2f4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UserModule-49170b5a6ea587ebf482dd091907a2113dcd67f96ed62d2a52803fd9cbf676678e92b9fb45a1e475d5405e8c624d8a6a2679527d2f1ceaae4b82079c20bcd2f4"' :
                                        'id="xs-injectables-links-module-UserModule-49170b5a6ea587ebf482dd091907a2113dcd67f96ed62d2a52803fd9cbf676678e92b9fb45a1e475d5405e8c624d8a6a2679527d2f1ceaae4b82079c20bcd2f4"' }>
                                        <li class="link">
                                            <a href="injectables/UserService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/AuthEntity.html" data-type="entity-link" >AuthEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AuthPass.html" data-type="entity-link" >AuthPass</a>
                                </li>
                                <li class="link">
                                    <a href="entities/OrdersEntity.html" data-type="entity-link" >OrdersEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateDto.html" data-type="entity-link" >CreateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/OrderDto.html" data-type="entity-link" >OrderDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="classes/RegisterDto.html" data-type="entity-link" >RegisterDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ResponseModel.html" data-type="entity-link" >ResponseModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateDto.html" data-type="entity-link" >UpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateProfileDto.html" data-type="entity-link" >UpdateProfileDto</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});