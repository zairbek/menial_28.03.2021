FROM php:7.4-fpm

###########################################################################
# Base:
###########################################################################
RUN set -eux; \
    apt-get update; \
    apt-get upgrade -y; \
    pecl channel-update pecl.php.net; \
    apt-get install -y --no-install-recommends \
            apt-utils \
            curl \
            libmemcached-dev \
            libz-dev \
            libpq-dev \
            libssl-dev \
            libmcrypt-dev \
            libonig-dev \
            vim

#####################################
# Install the PHP pdo_mysql extention
RUN docker-php-ext-install pdo_mysql;

############################
# Install the PHP gd library
RUN apt-get install -yqq \
        libpng-dev \
        libwebp-dev \
        libjpeg-dev \
        libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install gd

############
# ZIP module
RUN apt-get install -yqq \
        zip \
        unzip \
        libzip-dev \
    && docker-php-ext-configure zip \
    && docker-php-ext-install zip


###########################################################################
# NODE 12:
###########################################################################

RUN curl -sL https://deb.nodesource.com/setup_12.x | bash - \
    && apt-get install -yqq nodejs


###########################################################################
# PHP REDIS EXTENSION
###########################################################################

ARG INSTALL_PHPREDIS=true

RUN if [ ${INSTALL_PHPREDIS} = true ]; then \
    # Install Php Redis Extension
    pecl install -o -f redis-4.3.0 \
    && rm -rf /tmp/pear \
    && docker-php-ext-enable redis \
;fi


###########################################################################
# bcmath:
###########################################################################

ARG INSTALL_BCMATH=true

RUN if [ ${INSTALL_BCMATH} = true ]; then \
    # Install the bcmath extension
    docker-php-ext-install bcmath \
;fi


###########################################################################
# Exif:
###########################################################################

ARG INSTALL_EXIF=true

RUN if [ ${INSTALL_EXIF} = true ]; then \
    # Enable Exif PHP extentions requirements
    docker-php-ext-install exif \
;fi


###########################################################################
# Opcache:
###########################################################################

ARG INSTALL_OPCACHE=true

RUN if [ ${INSTALL_OPCACHE} = true ]; then \
    docker-php-ext-install opcache \
;fi
# Copy opcache configration
COPY .docker/php-fpm/opcache.ini /usr/local/etc/php/conf.d/opcache.ini

###########################################################################
# Mysqli Modifications:
###########################################################################

ARG INSTALL_MYSQLI=true

RUN if [ ${INSTALL_MYSQLI} = true ]; then \
    docker-php-ext-install mysqli \
;fi


###########################################################################
# Image optimizers:
###########################################################################

USER root

ARG INSTALL_IMAGE_OPTIMIZERS=true

RUN if [ ${INSTALL_IMAGE_OPTIMIZERS} = true ]; then \
    apt-get install -y jpegoptim optipng pngquant gifsicle \
    && npm install -g svgo \
;fi

###########################################################################
# ImageMagick:
###########################################################################

USER root

ARG INSTALL_IMAGEMAGICK=true

RUN if [ ${INSTALL_IMAGEMAGICK} = true ]; then \
    apt-get install -y libmagickwand-dev imagemagick && \
    pecl install imagick && \
    docker-php-ext-enable imagick \
;fi


###########################################################################
# MySQL Client:
###########################################################################

USER root

ARG INSTALL_MYSQL_CLIENT=true

RUN if [ ${INSTALL_MYSQL_CLIENT} = true ]; then \
      apt-get -y install default-mysql-client \
;fi

###########################################################################
# Composer:
###########################################################################

ARG INSTALL_COMPOSER=true

RUN if [ ${INSTALL_COMPOSER} = true ]; then \
    curl -sS https://getcomposer.org/installer | php -- \
            --install-dir=/usr/local/bin \
            --filename=composer \
       && chmod +x /usr/local/bin/composer \
;fi


###########################################################################
# xDebug:
###########################################################################

ARG INSTALL_XDEBUG=false

RUN if [ ${INSTALL_XDEBUG} = true ]; then \
    pecl install xdebug-2.9.0; \
    docker-php-ext-enable xdebug \
;fi

# Copy xdebug configuration for remote debugging
COPY .docker/php-fpm/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

RUN sed -i "s/xdebug.remote_autostart=0/xdebug.remote_autostart=1/" /usr/local/etc/php/conf.d/xdebug.ini && \
    sed -i "s/xdebug.remote_enable=0/xdebug.remote_enable=1/" /usr/local/etc/php/conf.d/xdebug.ini && \
    sed -i "s/xdebug.cli_color=0/xdebug.cli_color=1/" /usr/local/etc/php/conf.d/xdebug.ini


###########################################################################
# Google Chrome headless & Puppeteer: composer require spatie/browsershot
###########################################################################

ARG INSTALL_PUPPETEER=true

RUN if [ ${INSTALL_PUPPETEER} = true ]; then \
    npm install -g puppeteer --unsafe-perm \
    && apt-get update && apt-get install -y \
            libnss3 \
            libatk1.0-dev \
            libatk-bridge2.0-dev \
            libx11-xcb-dev \
            libdrm-dev \
            libxkbcommon-dev \
            libxcomposite-dev \
            libxdamage-dev \
            libxrandr-dev \
            libgtk-3-dev \
            libasound-dev \
;fi


###########################################################################
# Supervisord & Cron:
###########################################################################

RUN apt-get install -yqq \
        supervisor \
        cron

# supervisor configurations
#COPY .docker/dev/php-worker/run_supervisord.sh /opt/bin/run_supervisord.sh
COPY .docker/php-fpm/supervisord.conf /etc/supervisor/supervisord.conf
COPY .docker/php-fpm/supervisord.d/ /etc/supervisor/conf.d/


###########################################################################
#--------------------------------------------------------------------------
# Final Touch
#--------------------------------------------------------------------------

COPY .docker/php-fpm/php7.4.ini /usr/local/etc/php/php.ini
COPY .docker/php-fpm/laravel.ini /usr/local/etc/php/conf.d
COPY .docker/php-fpm/xlaravel.pool.conf /usr/local/etc/php-fpm.d/

USER root

# Clean up
RUN rm -rf /var/www/html \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && rm /var/log/lastlog /var/log/faillog

# Configure non-root user.
ARG PUID=1000
ENV PUID ${PUID}
ARG PGID=1000
ENV PGID ${PGID}

RUN groupmod -o -g ${PGID} www-data && \
    usermod -o -u ${PUID} -g www-data www-data


# crontab configurations
RUN crontab -l | { cat; echo "* * * * * /usr/local/bin/php /var/www/artisan schedule:run >/dev/null 2>&1"; } | crontab -u www-data -


CMD ["/usr/bin/supervisord", "-n", "-c", "/etc/supervisor/supervisord.conf"]

WORKDIR /var/www
